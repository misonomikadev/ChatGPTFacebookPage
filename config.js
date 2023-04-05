const NodeCache = require("node-cache")

const config = {
    pageToken: '', // Đưa token của fanpage của bạn vô đây.
    appSecret: '', // Cái này có thể có hoặc không, nếu có thì nó càng bảo mật.
    verifyToken: '', // Nhập cái gì vô đây cũng được nhưng nhớ copy vào Verify Token ở mục Webhooks.
    openai: {
        model: '', // Model ChatGPT (gpt-3-turbo, gpt-3, gpt-4)
        token: '', // API Token của ChatGPT
        max_tokens: 2048 // Bạn có thể thay đổi theo bạn muốn.
    },
    mode: 'CHAT', // bạn có thể chỉnh thành IMAGE để bot tạo ảnh nhé. 
    baseURL: 'https://graph.facebook.com/v16.0',
    ratelimit: new Map(),
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    port: 5500
}

module.exports = config