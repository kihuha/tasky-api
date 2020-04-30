const mongoose = require('mongoose')
const {Schema, model} = mongoose

const TodoSchema = new Schema(
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

const TodoModel = model('Todo', TodoSchema)

module.exports = TodoModel
