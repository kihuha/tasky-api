const request = require('supertest')
const app = require('../app')
const TaskModel = require('../data/taskModel')
const SubTaskModel = require('../data/subTaskModel')

describe("SUBTASKS", () => {
    let task, subTask, testData, testData2

    beforeAll(async () => {
            await TaskModel.deleteMany()
            await SubTaskModel.deleteMany()

            testData = {
                title: 'Test Task',
                completed: false
            }
            task = await new TaskModel(testData).save()

            testData2 = {
                title: 'Test Sub Task',
                completed: false,
                task: task._id
            }
            subTask = await new SubTaskModel(testData2).save()
        }
    )

    it("Should create new subtasks for a particular task", async () => {
        const newData = {
            title: 'NEW SUBTASK ITEM',
            completed: false
        }
        const res = await request(app)
            .post('/api/v1/tasks/' + task._id + '/subtasks')
            .send(newData)
        const res2 = await request(app)
            .post('/api/v1/tasks/' + task._id + '/subtasks')
            .send(newData)

        const getSubTask = await SubTaskModel.find({_id: res.body._id})
        const getSubTask2 = await SubTaskModel.find({_id: res2.body._id})

        expect(res.status).toBe(201)
        expect(res2.status).toBe(201)
        expect(getSubTask).not.toBeNull()
        expect(getSubTask2).not.toBeNull()
    })

    it("Should get all subtasks for a particular task", async () => {
        const res = await request(app).get('/api/v1/tasks/' + task._id + '/subtasks')

        expect(res.status).toBe(200)
        //CREATED TWO SUBTASKS ABOVE AND ONE IN BEFORE ALL
        expect(res.body.length).toBe(3)
    })

    it("Should get a specific subtask", async () => {
        const res = await request(app).get('/api/v1/tasks/' + task._id + '/subtasks/' + subTask._id)

        expect(res.status).toBe(200)
        expect(res.body.title).toBe(subTask.title)
        expect(res.body.completed).toBe(subTask.completed)
    })

    it("Should update a specific subtask", async () => {
        const changes = {
            title: "Updated the subtask",
            completed: !subTask.completed
        }
        const res = await request(app)
            .patch('/api/v1/tasks/' + task._id + '/subtasks/' + subTask._id)
            .send(changes)


        expect(res.status).toBe(200)
        expect(res.body.title).not.toBe(subTask.title)
        expect(res.body.completed).not.toBe(subTask.completed)
        expect(res.body.title).toBe(changes.title)
        expect(res.body.completed).toBe(changes.completed)

    })

    it("Should delete a specific subtask", async () => {
        const before = await request(app).get('/api/v1/tasks/' + task._id + '/subtasks/' + subTask._id)
        const res = await request(app).delete('/api/v1/tasks/' + task._id + '/subtasks/' + subTask._id)

        expect(before.status).toBe(200)
        expect(res.status).toBe(204)


        const after = await request(app).get('/api/v1/tasks' + task._id + '/subtasks' + subTask._id)
        expect(after.status).toBe(404)
    })
})


describe("SUBTASKS - ERRORS", () => {
    let task, subTask

    beforeEach(
        async () => {
            await TaskModel.deleteMany()
            await SubTaskModel.deleteMany()

            task = new TaskModel(
                {
                    title: 'Error Test Task',
                    completed: false
                }
            )

            subTask = new SubTaskModel(
                {
                    title: 'Error Sub Task',
                    completed: false,
                    task: task._id
                }
            )
        }
    )

    it("Should return a 404 if item does not exist", async () => {
        await TaskModel.deleteMany()
        await SubTaskModel.deleteMany()

        const getRes = await request(app).get('/api/v1/tasks/'+ task._id+'/subtasks/'+subTask._id)
        const updateRes = await request(app).patch('/api/v1/tasks/'+ task._id+'/subtasks/'+subTask._id)
        const deleteRes = await request(app).delete('/api/v1/tasks/'+ task._id+'/subtasks/'+subTask._id)


        expect(getRes.status).toBe(404)
        expect(updateRes.status).toBe(404)
        expect(deleteRes.status).toBe(404)
    })
})