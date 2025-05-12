import supertest from 'supertest'
import app from '../src/app'
import { ERROR } from '../src/constants'

const ENDPOINT = '/api/users'

const server = app()
const req = supertest(server)

afterAll(async () => {
    server.close()
})

describe('Scenario 1: create and delete user', () => {
    let id = ''
    test('GET /api/users should return status 200 and empty users array', async () => {
        const res = await req.get(ENDPOINT)

        expect(res.status).toBe(200)
        expect(res.body).toHaveLength(0)
    })
    test('POST /api/users should create new user, return status 201 and the created user', async () => {
        const newUser = {
            username: 'New User',
            age: 99,
            hobbies: ['MMORPG']
        }

        const createUser = await req.post(ENDPOINT).send(newUser)
        expect(createUser.status).toBe(201)

        id = createUser.body.id
    })
    test('GET /api/users/{USER_ID} should return status 200 and user by current id', async () => {
        const checkUser = await req.get(`${ENDPOINT}/${id}`)
        expect(checkUser.status).toBe(200)
        expect(checkUser.body.username).toBe('New User')
    })
    test('DELETE /api/users/{USER_ID} should remove user, return status 204', async () => {
        const removeUser = await req.delete(`${ENDPOINT}/${id}`)
        expect(removeUser.status).toBe(204)
    })
    test('GET /api/users/{USER_ID} should return status 404', async () => {
        const checkDeleted = await req.get(`${ENDPOINT}/${id}`)
        expect(checkDeleted.status).toBe(404)
    })
})

describe('Scenario 2: create and update user', () => {
    let id = ''

    test('POST /api/users should create new user, return status 201 and the created user', async () => {
        const newUser = {
            username: 'New User',
            age: 99,
            hobbies: ['MMORPG']
        }

        const createUser = await req.post(ENDPOINT).send(newUser)
        expect(createUser.status).toBe(201)

        id = createUser.body.id
    })

    test('GET /api/users/{USER_ID} should return status 200 and user by current id', async () => {
        const checkUser = await req.get(`${ENDPOINT}/${id}`)
        expect(checkUser.status).toBe(200)
        expect(checkUser.body.username).toBe('New User')
    })

    test('PUT /api/users should update user, return status 200 and the updated user', async () => {
        const updateUser = {
            username: 'Updated User',
            age: 200,
            hobbies: ['DnD']
        }

        const updatedUser = await req.put(`${ENDPOINT}/${id}`).send(updateUser)
        expect(updatedUser.status).toBe(200)
        expect(updatedUser.body.username).toBe('Updated User')
    })
})

describe('Scenario 3: handle error, if ID is wrong', () => {
    let wrongId = '316a7cbd-3932-49ad-9678-a2a2fa8fb974'

    test('POST /api/users should create new user, return status 201 and the created user', async () => {
        const newUser = {
            username: 'New User',
            age: 99,
            hobbies: ['MMORPG']
        }

        const createUser = await req.post(ENDPOINT).send(newUser)
        expect(createUser.status).toBe(201)
    })

    test('GET /api/users/{USER_ID} with invalid ID format should return status 400', async () => {
        const checkUser = await req.get(`${ENDPOINT}/11111`)
        expect(checkUser.status).toBe(400)
        expect(checkUser.body).toBe(ERROR.INVALID_ID)
    })

    test('GET /api/users/{USER_ID} with wrong ID should return status 404', async () => {
        const checkUser = await req.get(`${ENDPOINT}/${wrongId}`)
        expect(checkUser.status).toBe(404)
        expect(checkUser.body).toBe(ERROR.NOT_FOUND)
    })
})
