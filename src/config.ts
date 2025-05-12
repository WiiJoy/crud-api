import { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './database'
import { IUser, IAnswer } from './types';
import { getId, outputRes, urlValidate, bodyValidate } from './utils';
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

        if (!id && !urlValidate(url)) {
            outputRes(res, {
                status: STATUS.NOT_FOUND,
                content: ERROR.INVALID_URL
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
                    const checkValid = bodyValidate(user, true)

                    const saved = checkValid.isValid ? db.createUser(user) : checkValid
                    outputRes(res, {
                        status: saved.status || STATUS.INVALID,
                        content: saved.content || ERROR.STH_WRONG
                    })
                })
                break
            case 'PUT':
                let updateData = ''
                req.on('data', chunk => {
                    updateData += chunk
                })
                req.on('end', () => {
                    const user: IUser = JSON.parse(updateData)
                    const checkValid = bodyValidate(user, false)

                    const updated = checkValid.isValid ? db.updateUser(id, user) : checkValid
                    outputRes(res, {
                        status: updated.status || STATUS.INVALID,
                        content: updated.content || ERROR.STH_WRONG
                    })
                })
                break
            case 'DELETE':
                const deletedData = db.removeUser(id)
                outputRes(res, deletedData)
                break
            default:
                outputRes(res, {
                    status: STATUS.NOT_FOUND,
                    content: ERROR.INVALID_METHOD
                })
                break
        }
    } catch (error) {
        outputRes(res, {
            status: STATUS.SERVER_ERROR,
            content: ERROR.SERVER_ERROR
        })
    }
}