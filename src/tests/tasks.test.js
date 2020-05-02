const request = require('supertest')
const TaskModel = require('../data/taskModel')
const app = require('../app')

describe("TASKS", () => {
    let testData, task;

    beforeAll(
        async () => {
            await TaskModel.deleteMany()
        }
    )

    beforeEach(
        async () => {
            testData = {
                title: 'Test Task',
                completed: false
            }
            task = await new TaskModel(testData).save()
        }
    )

    afterEach(
        async () => {
            await TaskModel.deleteMany()
        }
    )

    it("Should get all the tasks", async () => {
        const res = await request(app).get('/api/v1/tasks')

        expect(res.status).toBe(200)
    })

    it("Should create a task", async () => {
        const testData = {
            title: 'Test Task 2',
            completed: true
        }
        const res = await request(app).post('/api/v1/tasks').send(testData)
        const getTask = await TaskModel.findById(res.body._id)

        expect(getTask).not.toBeNull()
    })

    it("Should return a specific task", async () => {
        const id = task._id
        const res = await request(app).get('/api/v1/tasks/'+ id)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(testData)
    })

    it("Should update a specific task", async () => {
        const id = task._id
        const updateData = {
            title: 'Updated Title',
            completed: !testData.completed
        }
        const res = await request(app).patch('/api/v1/tasks/'+ id).send(updateData)

        expect(res.status).toBe(200)
        expect(res.body).not.toMatchObject(testData)
        expect(res.body).toMatchObject(updateData)
    })

    it("Should delete a specific task", async () => {
        const id = task._id
        const res = await request(app).delete('/api/v1/tasks/'+ id)

        expect(res.status).toBe(204)
    })
})

describe('TASKS - ERRORS', () => {
    let testData, task;

    beforeEach(
        async () => {
            await TaskModel.deleteMany()
            testData = {
                title: 'Test Task',
                completed: false
            }
            task = await new TaskModel(testData).save()
        }
    )

    it("Should fail to create a task - MISSING FIELD", async () => {
        const testData = {
            completed: true
        }

        const res = await request(app).post('/api/v1/tasks').send(testData)

        expect(res.status).toBe(400)
    })

    it("Should fail to return a specific task - VALUE CAST ERROR", async () => {
        const res = await request(app).get('/api/v1/tasks/'+ 123456789)
        expect(res.status).toBe(500)
    })

    it("Should fail to return a specific task - VALUE DOES NOT EXIST", async () => {
        const res = await request(app).delete('/api/v1/tasks/'+ task._id)
        const getRes = await request(app).delete('/api/v1/tasks/'+ task._id)

        expect(res.status).toBe(204)
        expect(getRes.status).toBe(404)
    })

    it("Should fail to update specific task - INVALID FIELDS", async () => {
        const updateData = {
            title: null,
            completed: 'yes'
        }

        const updateRes = await request(app).patch('/api/v1/tasks/'+ task._id).send(updateData)
        expect(updateRes.status).toBe(400)
    })

    it("Should fail to update a specific task - NON-EXISTENT RECORD", async () => {
        const updateData = {
            title: 'Valid Title',
            completed: false
        }
        const res = await request(app).delete('/api/v1/tasks/'+ task._id)
        const updateRes = await request(app).patch('/api/v1/tasks/'+ task._id).send(updateData)

        expect(res.status).toBe(204)
        expect(updateRes.status).toBe(404)
    })

    it("Should fail to delete a specific task - NON-EXISTENT RECORD", async () => {
        const res = await request(app).delete('/api/v1/tasks/'+ task._id)
        const res2 = await request(app).delete('/api/v1/tasks/'+ task._id)

        expect(res.status).toBe(204)
        expect(res2.status).toBe(404)
    })
})
