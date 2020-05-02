const express = require('express')
const router = express.Router()
require('../data/db')
const TaskModel = require('../data/TaskModel')
const SubTaskModel = require('../data/SubTaskModel')

// TODOS
router.get(
    '/',
    async (req, res) => {
        const allTasks = await TaskModel.find({})
        try {
            res.status(200).send(allTasks)
        } catch (e) {
            res.status(400).send(e)
        }
    }
)

router.post(
    '/',
    async (req, res) => {
        try {
            const newTask = new TaskModel(req.body)
            const result = await newTask.save()
            res.status(201).send(result)
        } catch (e) {
            res.status(500).send(e)
        }
    }
)

router.get(
    '/:id',
    async (req, res) => {
        try {
            const task = await TaskModel.findById(req.params.id)

            !task && res.status(404).send()
            res.status(200).send(task)
        } catch (e) {
            res.status(500).send(e)
        }
    }
)

router.patch(
    '/:id',
    async (req, res) => {
        const task = await TaskModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            })

        !task && res.status(404).send()
        res.status(200).send(task)
    }
)

router.delete(
    '/:id',
    async (req, res) => {
        try {
            const task = await TaskModel.findByIdAndDelete(req.params.id)
            !task && res.status(404).send()
            res.status(204).send()
        } catch (e) {
            res.status(500).send(e)
        }
    }
)

// SUBTASKS
router.get(
    '/:id/subtasks',
    async (req, res) => {
        try {
            const subtasks = await SubTaskModel.find({task: req.params.id})

            !subtasks && res.status(404).send()
            res.status(200).send(subtasks)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

router.post(
    '/:id/subtasks',
    async (req, res) => {
        try {
            const newSubtask = await new SubTaskModel(
                {
                    ...req.body,
                    task: req.params.id
                }).save()

            !newSubtask && res.status(404).send()
            res.status(201).send(newSubtask)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

router.get(
    '/:id/subtasks/:subId',
    async (req, res) => {
        try {
            const subtask = await SubTaskModel.findById(req.params.subId)

            !subtask && res.status(404).send()
            res.status(200).send(subtask)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

router.patch(
    '/:id/subtasks/:subId',
    async (req, res) => {
        try {
            const subtask = await SubTaskModel.findByIdAndUpdate(
                req.params.subId,
                req.body,
                {
                    new: true
                })

            console.log(subtask)

            !subtask && res.status(404).send()
            res.status(200).send(subtask)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

router.delete(
    '/:id/subtasks/:subId',
    async (req, res) => {
        try {
            const subTask = await SubTaskModel.findByIdAndDelete(req.params.subId)

            !subTask && res.status(404).send()
            res.status(204).send()
        } catch(e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
)

module.exports = router
