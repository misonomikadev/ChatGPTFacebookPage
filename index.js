const express = require('express')
const crypto = require('crypto')
const qs = require('qs')
const ms = require('ms')

const app = express()
const axios = require('axios').default
const config = require('./config.js')

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ verify: (req, res, buf) => req.rawBody = buf }))

app.get('/webhooks', (req, res) => {
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode && token) {
        switch (mode) {
            case 'subscribe':
                if (config.verifyToken === token) {
                    console.log(`Webhooks Verified.`)
                    res.status(200).send(challenge)
                } else {
                    res.sendStatus(403)
                }
                break
            default:
                res.sendStatus(404)
        }
    } else {
        res.sendStatus(404)
    }
})

async function sendMessage(psid, content) {
    const querystring = qs.stringify({ access_token: config.pageToken })
    return axios.post(`${config.baseURL}/me/messages?${querystring}`, {
        recipient: { id: psid },
        messaging_type: 'RESPONSE',
        message: { text: content }
    }, { headers: { 'Content-Type': 'application/json' } })
}

async function handlers(event) {
    const msg = event.entry[0].messaging[0]
    if (config.ratelimit.has(msg.sender.id))
        return sendMessage(msg.sender.id, 'Bot đang xử lý câu hỏi trước, vui lòng chờ.')

    config.ratelimit.set(msg.sender.id, true)

    const history = config.cache.get(msg.sender.id)
    const content = msg.message.text.trim()

    return axios.post('https://api.openai.com/v1/chat/completions', {
        model: config.openai.model,
        messages: !history ? [
            { role: 'user', content: content },
        ] : [
            { role: 'user', content: history.question },
            { role: 'assistant', content: history.answer },
            { role: 'user', content: content }
        ],
        max_tokens: config.openai.max_tokens
    }, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${config.openai.token}`
        }
    }).then(res => {
        const success = res.data.choices[0].message.content

        config.cache.del(msg.sender.id)
        config.cache.set(msg.sender.id, {
            question: content,
            answer: success
        }, ms('10m'))

        config.ratelimit.delete(msg.sender.id)
        return sendMessage(msg.sender.id, success)
    }).catch(error => {
        console.error(error)
        config.ratelimit.delete(msg.sender.id)

        return sendMessage(msg.sender.id, 'Có lỗi xảy ra, xin hãy kiểm tra lại.')
    })
}

app.post('/webhooks', (req, res) => {
    if (config.appSecret) {
        const signature = req.headers['x-hub-signature-256']
        if (!signature) return res.sendStatus(401)

        const signatureHash = signature.split('=')[1]
        const expectedHash = crypto.createHmac('sha256', config.appSecret)
            .update(req.rawBody).digest('hex')

        if (signatureHash !== expectedHash) return res.sendStatus(403)
    }

    handlers.call(null, req.body)
    return res.sendStatus(200)
})

app.listen(config.port, () => console.log(`App đang chạy tại port: ${config.port}`))