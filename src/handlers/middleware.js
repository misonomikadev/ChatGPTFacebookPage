const Application = require('../main')
const express = require('express')
const logger = require('morgan')
const path = require('path')
const fs = require('fs')

/** @this {Application} */
module.exports = function() {
    this.main.use(logger('dev'))
    this.main.use(express.urlencoded({ extended: false }))
    this.main.use(express.json({
        verify: (req, res, buffer) => req.buffer = buffer,
        strict: true
    }))
    
    const eventFolder = path.join(this.src, 'events')
    for (const file of fs.readdirSync(eventFolder)) {
        if (!file.endsWith('.js')) continue

        const event = require(`../events/${file}`)
        if (typeof event !== 'function') continue

        const eventName = file.slice(0, file.indexOf('.js'))
        this.on(eventName, event.bind(this))
    }
}