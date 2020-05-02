const express = require('express')
const router = express.Router()
require('../data/db')
const TaskModel = require('../data/TaskModel')
const SubTaskModel = require('../data/SubTaskModel')
const validator = require('../utils/validator')

// TODOS
router.get(
    '/',
    async (req, res) => {
        const allTasks = await TaskModel.find({})
        res.status(200).send(allTasks)
    }
)

router.post(
    '/',
    async (req, res) => {
        // VALIDATE FIELDS
        const valid = validator.newTask(req.body)
        if (!valid[0]) return res.status(400).send(valid[1])

        const newTask = new TaskModel(req.body)
        const result = await newTask.save()
        res.status(201).send(result)
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const task = await TaskModel.findById(req.params.id)
            res.status(200).send(task)
        } catch(e) {
            console.log(e)
            res.status(500).send()
        }
    }
)

router.patch(
    '/:id',
    async (req, res) => {

        // VALIDATE FIELDS
        const valid = validator.updateTask(req.body)
        if (!valid[0]) return res.status(400).send(valid[1])


        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            })

        if (!task) return res.status(404).send({})
        res.status(200).send(task)
    }
)

router.delete(
    '/:id',
    async (req, res) => {
        const task = await TaskModel.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).send()

        res.status(204).send()
    }
)

// SUBTASKS
router.get(
    '/:id/subtasks',
    async (req, res) => {
        const subtasks = await SubTaskModel.find({task: req.params.id})

        res.status(200).send(subtasks)
    }
)

router.post(
    '/:id/subtasks',
    async (req, res) => {
        // VALIDATE FIELDS
        const valid = validator.newTask(req.body)
        if (!valid[0]) return res.status(400).send(valid[1])

        const newSubtask = await new SubTaskModel(
            {
                ...req.body,
                task: req.params.id
            }).save()

        res.status(201).send(newSubtask)
    }
)

router.get(
    '/:id/subtasks/:subId',
    async (req, res) => {
        const subtask = await SubTaskModel.findById(req.params.subId)

        if (!subtask) return res.status(404).send()
        res.status(200).send(subtask)
    }
)

router.patch(
    '/:id/subtasks/:subId',
    async (req, res) => {
        // VALIDATE FIELDS
        const valid = validator.updateTask(req.body)
        if (!valid[0]) return res.status(400).send(valid[1])

        const subtask = await SubTaskModel.findByIdAndUpdate(
            req.params.subId,
            req.body,
            {
                new: true
            })

        if (!subtask) return res.status(404).send()
        res.status(200).send(subtask)
    }
)

router.delete(
    '/:id/subtasks/:subId',
    async (req, res) => {
        const subTask = await SubTaskModel.findByIdAndDelete(req.params.subId)

        if (!subTask) return res.status(404).send()
        res.status(204).send()
    }
)

module.exports = router
