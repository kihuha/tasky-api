const mongoose = require('mongoose')
const {Schema, ObjectId, model} = mongoose

const TodoSchema = new Schema(
    {
        id: ObjectId,
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
