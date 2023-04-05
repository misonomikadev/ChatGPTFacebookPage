const NodeCache = require("node-cache")

const config = {
    pageToken: 'EAAK4LazBcpABAJKwGkuZAmDv3pBIjX3AlqCwEuNiZBdioIkx6fyeULZC9QhcOaubBMsQVL2KfDlEbyG800huZA8KJZBsGyELnYuLHbdMhIrZBMwwWQtLk6ooVia0dzSZCPUkpCK21f8Iqh0k5000XHfwHd52H1rTMZAZAUktQSyKl6JcicSggUZApeZCEJCdpixqlxYfX69TEWWHAZDZD', // Đưa token của fanpage của bạn vô đây.
    appSecret: '302dd4e605dd26deb0c7f5c9c7f17a0f', // Cái này có thể có hoặc không, nếu có thì nó càng bảo mật.
    verifyToken: 'chinoiskawaii', // Nhập cái gì vô đây cũng được nhưng nhớ copy vào Verify Token ở mục Webhooks.
    openai: {
        model: 'gpt-3.5-turbo', // Model ChatGPT (gpt-3-turbo, gpt-3, gpt-4)
        token: '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', // API Token của ChatGPT
        max_tokens: 2048 // Bạn có thể thay đổi theo bạn muốn.
    },
    mode: 'IMAGE', // Chuyển thành IMAGE nếu bạn muốn bot tạo ảnh.
    baseURL: 'https://graph.facebook.com/v16.0',
    ratelimit: new Map(),
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    port: 5500
}

module.exports = config