const mongoose = require('mongoose')
const {Schema, model} = mongoose

const TaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }
)

const TaskModel = model('Task', TaskSchema)

module.exports = TaskModel
