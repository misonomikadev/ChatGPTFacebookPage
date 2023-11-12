const Application = require('../main')
const { Router } = require('express')
const path = require('path')
const fs = require('fs')

/** @this {Application} */
module.exports = function() {
    const folder = path.join(this.src, 'routers')
    for (const file of fs.readdirSync(folder)) {
        if (!file.endsWith('.js')) continue

        const routerFunction = require(`../routers/${file}`)
        if (typeof routerFunction !== 'function') continue

        const router = Router({ strict: true })
        routerFunction.call(router, this)

        const routePath = file.slice(0, file.indexOf('.js'))
        this.main.use(`/${routePath}`, router)
    }
}