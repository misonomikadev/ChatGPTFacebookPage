const Application = require('../main')
const { Router } = require('express')
const crypto = require('crypto')

/**
 * @this {Router}
 * @param {Application} app 
 */
module.exports = function (app) {
    this.get('/', (req, res) => {
        const mode = req.query['hub.mode']
        const token = req.query['hub.verify_token']
        const challenge = req.query['hub.challenge']

        if (mode && token) {
            if (mode === 'subscribe' && token === process.env.verify_token) {
                console.log(`> Webhook verifed (${challenge}).`)
                res.status(200).send(challenge)
            } else {
                res.sendStatus(403)
            }
        } else {
            res.sendStatus(403)
        }
    })

    this.post('/', (req, res) => {
        if (process.env.app_secret) {
            const signature = req.headers['x-hub-signature-256']

            if (signature) {
                const elements = signature.split('=')
                const signatureHash = elements[1]
                const expectedHash = crypto.createHmac('sha256', process.env.app_secret)
                    .update(req.buffer).digest('hex')
                if (signatureHash !== expectedHash) {
                    console.error('> Couldn\'t validate the request signature.')
                    return res.sendStatus(401)
                }
            } else {
                console.warn(`> Couldn't find 'x-hub-signature-256' in headers.`)
                return res.sendStatus(404)
            }
        }

        if ('messaging' in req.body.entry[0]) {
            app.emit('messaging', req.body.entry[0].messaging[0])
        }

        res.sendStatus(200)
    })
}