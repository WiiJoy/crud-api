import { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './database'
import { IUser, IAnswer } from './types';
import { getId, outputRes } from './utils';
import { validate as uuidValidate } from 'uuid'
import { ERROR, STATUS } from './constants'

export const config = async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req
    console.log('url', url)
    try {
        if (!url || !url.startsWith('/api/users')) {
            outputRes(res, {
                status: STATUS.NOT_FOUND,
                content: ERROR.INVALID_URL
            })
            return
        }

        const id = getId(url)

        if (id && !uuidValidate(id)) {
            outputRes(res, {
                status: STATUS.INVALID,
                content: ERROR.INVALID_ID
            })
            return
        }

        switch (method) {
            case 'GET':
                let data: IAnswer = {
                    content: '',
                    status: STATUS.SERVER_ERROR
                }

                if (id) {
                    data = db.getUser(id)
                } else {
                    data = db.getUsers()
                }

                outputRes(res, data)
                break
            case 'POST':
                let bodyData = ''
                req.on('data', chunk => {
                    bodyData += chunk
                })
                req.on('end', () => {
                    const user: IUser = JSON.parse(bodyData)
                    const saved = db.createUser(user)
                    outputRes(res, saved)
                })
                break
            case 'PUT':
                let updateData = ''
                req.on('data', chunk => {
                    updateData += chunk
                })
                req.on('end', () => {
                    const user: IUser = JSON.parse(updateData)
                    const updated = db.updateUser(id, user)
                    outputRes(res, updated)
                })
                break
            case 'DELETE':
                const deletedData = db.removeUser(id)
                outputRes(res, deletedData)
                break
        }
    } catch (error) {
        outputRes(res, {
            status: STATUS.SERVER_ERROR,
            content: ERROR.SERVER_ERROR
        })
    }
}