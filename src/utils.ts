import { ServerResponse } from 'node:http'
import { IAnswer } from './types'

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
