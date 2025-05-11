import { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './database'
import { IUser, IAnswer } from './types';
import { getId } from './utils';
import { validate as uuidValidate } from 'uuid'

export const config = async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req
    console.log('url', url)
    try {
        if (!url || !url.startsWith('/api/users')) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify('Invalid URL: please check the address and try again'))
            res.end()
            return
        }

        const id = getId(url)

        if (id && !uuidValidate(id)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify('Invalid ID: please check the ID and try again'))
            res.end()
            return
        }

        switch (method) {
            case 'GET':
                let data: IAnswer = {
                    content: '',
                    status: 500
                }

                if (id) {
                    data = db.getUser(id)
                } else {
                    data = db.getUsers()
                }

                res.statusCode = data.status
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(data.content))
                res.end()
                break
            case 'POST':
                let bodyData = ''
                req.on('data', chunk => {
                    bodyData += chunk
                })
                req.on('end', () => {
                    const user: IUser = JSON.parse(bodyData)
                    const saved = db.createUser(user)
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = saved.status
                    res.write(JSON.stringify(saved.content))
                    res.end()
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
                    res.setHeader('Content-Type', 'application/json')
                    res.statusCode = updated.status
                    res.write(JSON.stringify(updated.content))
                    res.end()
                })
                break
            case 'DELETE':
                const deletedData = db.removeUser(id)
                console.log('deletedData', deletedData)
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = deletedData.status
                res.write(JSON.stringify(deletedData.content))
                res.end()
                break
        }
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify('Internal server error'));
        res.end();
    }
}