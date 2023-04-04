const NodeCache = require("node-cache")

const config = {
    pageToken: 'EAAK4LazBcpABAJC3Rfjmvd28ZBf9uoEiGH2ayShbaZBnLkqvwb1HQeC76ZCDXtExZBdq0h07ZBKLRwpgGwPQjtimHLrZAIQOZC2wv2MHcl0dwyC4WZCr1rdRI3AJ1Ejwvo4k0pEAIUfvyUCyAdjIY1EyiuUFtT4CkP5FzsZCd797ZCP4ctf4d4zA0hhSvZC6bSRPVNWKgibCy9grQZDZD',
    appSecret: '302dd4e605dd26deb0c7f5c9c7f17a0f',
    verifyToken: 'chinochinochinochinochinochinochinochinochinochino',
    openai: {
        model: '',
        token: '',
        max_tokens: 2048
    },
    baseURL: 'https://graph.facebook.com/v16.0',
    ratelimit: new Map(),
    cache: new NodeCache({
        checkperiod: 10000,
        deleteOnExpire: true
    }),
    port: 5500
}

module.exports = config