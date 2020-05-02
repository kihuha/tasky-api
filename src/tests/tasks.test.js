const request = require('supertest')
const app = require('../app')
const TaskModel = require('../data/taskModel')

describe("TASKS", () => {
    let testData;

    beforeAll(
        async () => {
            await TaskModel.deleteMany()
            testData = {
                title: 'Test Task',
                completed: false
            }
            task = await new TaskModel(testData).save()
        }
    )

    it("Should get all the tasks", async () => {
        const res = await request(app).get('/api/v1/tasks')

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject([testData])
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