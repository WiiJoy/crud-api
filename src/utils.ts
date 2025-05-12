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

export const bodyValidate = (body: IUser, isNew: boolean) => {
    if (isNew && (!('username' in body) || !("age" in body) || !('hobbies' in body))) {
        return {
            isValid: false,
            status: STATUS.INVALID,
            content: ERROR.CONTAIN_FIELDS
        }
    }

    if ((body.username && typeof body.username !== 'string') ||
        (body.age && typeof body.age !== 'number') ||
        (body.hobbies && !Array.isArray(body.hobbies))) {
        return {
            isValid: false,
            status: STATUS.INVALID,
            content: ERROR.WRONG_TYPES
        }
    }

    return { isValid: true }
}

export const setUsefulFields = (user: IUser, old?: IUser) => {
    const template: IUser = {
        username: '',
        age: 0,
        hobbies: []
    }

    const targetUser: IUser = old || template

    for (const key in template) {
        const keyName = key as keyof IUser
        if (keyName in user) copyField(keyName, targetUser, user)
    }

    return targetUser
}

const copyField = < T extends IUser > (k: keyof T, target: T, source: T) => {
    target[k] = source[k]
}
