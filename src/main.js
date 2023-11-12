const { EventEmitter } = require('events')
const NodeCache = require('node-cache')
const axios = require('axios').default
const { OpenAI } = require('openai')
const express = require('express')
const path = require('path')
const ms = require('ms')
const fs = require('fs')

class Application extends EventEmitter {
    constructor() {
        super({ captureRejections: true })

        this.chatgpt = new OpenAI()

        this.src = __dirname
        this.main = express()
        this.ratelimit = new Map()
        this.cache = new NodeCache({
            checkperiod: ms('30s'),
            deleteOnExpire: true,
            stdTTL: ms('5m')
        })

        this.ChatBot = require('./commands/ChatBot')
        this.GenerateImage = require('./commands/GenerateImage')
    }

    async sendMessage(id, options = {}) {
        const body = {
            recipient: { id: id },
            messaging_type: 'RESPONSE',
            message: {}
        }

        if ('content' in options) {
            body.message.text = options.content
        }

        if ('image' in options) {
            body.message.attachment = {
                type: 'image',
                payload: {
                    url: options.image,
                    is_reusable: false
                }
            }
        }

        return axios({
            url: 'https://graph.facebook.com/v18.0/me/messages',
            headers: { 'Content-Type': 'application/json' },
            params: { access_token: process.env.page_token },
            method: 'post',
            data: body
        })
    }

    run() {
        const handleFolder = path.join(this.src, 'handlers')
        for (const file of fs.readdirSync(handleFolder)) {
            if (!file.endsWith('.js')) continue

            const handleFunction = require(`./handlers/${file}`)
            if (typeof handleFunction !== 'function') continue

            handleFunction.call(this)
        }

        this.main.listen(3000, () => {
            console.log(`> App đang chạy tại: http://localhost:3000/`)
        })
    }
}

module.exports = Application