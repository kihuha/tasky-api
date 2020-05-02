const mongoose = require('mongoose')

const conn = mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

module.exports = conn
