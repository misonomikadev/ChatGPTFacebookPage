const Application = require('./src/main')
require('dotenv').config()

const application = new Application()
application.run()