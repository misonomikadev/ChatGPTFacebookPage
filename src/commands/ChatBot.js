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

    const history = this.cache.get(event.sender.id)
    this.ratelimit.set(event.sender.id, true)

    const messageContent = event.message.text.trim()
    await this.chatgpt.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: !history ? [
            { role: 'user', content: messageContent }
        ] : [
            { role: 'user', content: history.question },
            { role: 'assistant', content: history.answer },
            { role: 'user', content: messageContent }
        ],
        max_tokens: 2048
    }).then(res => {
        const success = res.choices[0].message.content
        this.cache.del(event.sender.id)
        this.cache.set(event.sender.id, {
            question: messageContent,
            answer: success
        })

        this.sendMessage(event.sender.id, { content: success })
    }).catch(error => {
        this.sendMessage(event.sender.id, { content: 'Đã có lỗi xảy ra!' })
        console.error(error)
    })
}