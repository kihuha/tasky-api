const mongoose = require('mongoose')
const {Schema, model} = mongoose

const SubTodoSchema = new Schema(
    {
        parentTodo: String,
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

const subTodoModel = new model('SubTodo', SubTodoSchema)

module.exports = subTodoModel
