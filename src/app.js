const express = require('express')
const app = express()
require('./data/db')
const TodoModel = require('./data/model')

app.use(express.json())

app.get(
    '/api/v1/todos',
    async (req, res) => {
        const allTodos = await TodoModel.find({})
        try {
            res.status(200).send(allTodos)
        } catch(e) {
            res.status(400).send(e)
        }

    }
)

// TODO: ADD IMPLEMENTATION TO SAVE TODO AND ENSURE PASSING TESTS
app.post(
    '/api/v1/todos',
    async (req, res) => {
        try {
            const newTodo = new TodoModel(req.body)
            const result = await newTodo.save()
            res.status(201).send(result)
        } catch(e) {
            res.status(500).send(e)
        }
    }
)

app.get(
    '/api/v1/todos/:id',
    async (req, res) => {
        try {
            const todo = await TodoModel.findById(req.params.id)

            !todo && res.status(404).send()
            res.status(200).send(todo)
        } catch(e) {
            res.status(500).send(e)
        }
    }
)

app.patch(
    '/api/v1/todos/:id',
    async (req, res) => {
        const todo = await TodoModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            })

        !todo && res.status(404).send()
        res.status(200).send(todo)
    }
)

app.delete(
    '/api/v1/todos/:id',
    async (req, res) => {
        try {
            const todo = await TodoModel.findByIdAndDelete(req.params.id)
            !todo && res.status(404).send()
            res.status(204).send()
        } catch(e) {
            res.status(500).send(e)
        }
    }
)

module.exports = app
