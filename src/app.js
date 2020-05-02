const express = require('express')
const app = express()
const TaskRouter = require('./routes/taskRouter')
app.use(express.json())

app.use('/api/v1/tasks', TaskRouter)

module.exports = app
