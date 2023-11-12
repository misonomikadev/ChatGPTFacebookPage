const Application = require('../main')
/**
 * @typedef Message
 * @property {{ id: string }} sender
 * @property {{ id: string }} recipient
 * @property {{ mid: string, text: string }} message
 * @property {number} timestamp
 */

/**
 * @this {Application}
 * @arg {Message} event
 */
module.exports = async function(event) {
    switch (process.env.type) {
        case 'ChatBot': {
            await this.ChatBot.call(this, event)
            break
        }
        case 'GenerateImage': {
            await this.GenerateImage.call(this, event)
            break
        }
        default:
            throw new Error(`Environment variable 'type' must be 'ChatBot' or 'GenerateImage'. Received '${process.env.type}'`)
    }

    this.ratelimit.delete(event.sender.id)
}