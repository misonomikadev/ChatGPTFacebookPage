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
    if (this.ratelimit.has(event.sender.id))
        return this.sendMessage(event.sender.id, { content: 'Bot đang xử lý câu hỏi trước, vui lòng chờ' })

    const messageContent = event.message.text.trim()
    await this.chatgpt.images.generate({
        prompt: messageContent,
        response_format: 'url',
        size: '1024x1024',
        n: 1
    }).then(res => this.sendMessage(event.sender.id, { image: res.data[0].url }))
    .catch(error => {
        this.sendMessage(event.sender.id, { content: 'Đã có lỗi xảy ra!' })
        console.error(error)
    })
}