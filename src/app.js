const express = require('express')
const app = express()
const TodoRouter = require('./routes/todoRouter')
app.use(express.json())

app.use('/api/v1/todo', TodoRouter)

module.exports = app
