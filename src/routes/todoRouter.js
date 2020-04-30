const express = require('express')
const router = express.Router()
require('./data/db')
const TodoModel = require('./data/TodoModel')
const SubTodoModel = require('./data/SubTodoModel')

// TODOS
router.get(
    '/',
    async (req, res) => {
        const allTodos = await TodoModel.find({})
        try {
            res.status(200).send(allTodos)
        } catch(e) {
            res.status(400).send(e)
        }

    }
)

router.post(
    '/',
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

router.get(
    '/:id',
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

router.patch(
    '/:id',
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

router.delete(
    '/:id',
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


module.exports = router
