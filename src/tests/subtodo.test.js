const request = require('supertest')
const app = require('../app')
const TodoModel = require('../data/TodoModel')
const SubTodoModel = require('../data/SubTodoModel')

describe("SUBTODOs", () => {
    let testData, todo;

    beforeAll(
        async () => {
            await TodoModel.deleteMany()
            await SubTodoModel.deleteMany()

            todoTestData = {
                title: 'Test Todo',
                completed: false
            }
            todo = await new TodoModel(todoTestData).save()

            const subTodoTestData = {
                parentTodo: todo._id,
                title: 'Sub todo task',
                completed: false
            }
            subtodo = await new SubTodoModel(subTodoTestData).save()
        }
    )

    it("Should get all the sub todos", async () => {
        const res = request(app).get('/api/' + todo._id + '/subtodos')

        expect(res.status).toBe(200)
    })
})