const mongoose = require('mongoose')
const {Schema, model} = mongoose

const SubTaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        task: {
            type: Schema.Types.ObjectID,
            required: true
        }
    }
)

const SubTaskModel = model('SubTask', SubTaskSchema)

module.exports = SubTaskModel
