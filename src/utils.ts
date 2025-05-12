import { ServerResponse } from 'node:http'
import { IAnswer, IUser } from './types'
import { ERROR, STATUS } from './constants'

export const getId = (url: string) => {
    const urlArray = url.split('/')
    const index = urlArray.indexOf('users')

    return urlArray[index + 1] || ''
}

export const outputRes = (res: ServerResponse, data: IAnswer) => {
    res.statusCode = data.status
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(data.content))
    res.end()
}

export const urlValidate = (url: string) => {
    return url === '/api/users'
}

export const bodyValidate = (body: IUser) => {
    if (!('username' in body) || !("age" in body) || !('hobbies' in body)) {
        return {
            isValid: false,
            status: STATUS.INVALID,
            content: ERROR.CONTAIN_FIELDS
        }
    }

    if (typeof body.username !== 'string' || typeof body.age !== 'number' || !Array.isArray(body.hobbies)) {
        return {
            isValid: false,
            status: STATUS.INVALID,
            content: ERROR.WRONG_TYPES
        }
    }

    return { isValid: true }
}
