import { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './database'
import { IUser } from './types';
import { getId } from './utils';

export const config = async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req
    try {
        if (!url || !url.startsWith('/api/users')) {
            res.statusCode = 404
            res.setHeader('Content-Type', 'application/json')
            res.write(JSON.stringify('Invalid URL: please check the address and try again'))
            res.end()
            return
        }

        switch (method) {
            case 'GET':
                const id = getId(url)
                let data: IUser | IUser[] | null = null

                if (id) {
                    data = db.getUser(id)
                } else {
                    data = db.getUsers()
                }

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(data))
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
                    res.statusCode = 201
                    res.write(JSON.stringify(saved))
                    res.end()
                })
                break
            case 'PUT':
                break
            case 'DELETE':
                break
        }
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify('Internal server error'));
        res.end();
    }
}