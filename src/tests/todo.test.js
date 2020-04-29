const request = require('supertest')
const app = require('../app')
const TodoModel = require('../data/model')

describe("TODO", () => {
    let testData, todo;

    beforeAll(
        async () => {
            await TodoModel.deleteMany()
            testData = {
                title: 'Test Todo',
                completed: false
            }
            todo = await new TodoModel(testData).save()
        }
    )

    it("Should get all the todos", async () => {
        const res = await request(app).get('/api/v1/todos')

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject([testData])
    })

    it("Should create a todo", async () => {
        const testData = {
            title: 'Test Todo 2',
            completed: true
        }
        const res = await request(app).post('/api/v1/todos').send(testData)
        const getTodo = await TodoModel.findById(res.body._id)

        expect(getTodo).not.toBeNull()
    })

    it("Should return a specific todo", async () => {
        const id = todo._id
        const res = await request(app).get('/api/v1/todos/'+ id)

        expect(res.status).toBe(200)
        expect(res.body).toMatchObject(testData)
    })

    it("Should update a specific todo", async () => {
        const id = todo._id
        const updateData = {
            title: 'Updated Title',
            completed: !testData.completed
        }
        const res = await request(app).patch('/api/v1/todos/'+ id).send(updateData)

        expect(res.status).toBe(200)
        expect(res.body).not.toMatchObject(testData)
        expect(res.body).toMatchObject(updateData)
    })

    it("Should delete a specific todo", async () => {
        const id = todo._id
        const res = await request(app).delete('/api/v1/todos/'+ id)

        expect(res.status).toBe(204)
    })
})