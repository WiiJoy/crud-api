import { IncomingMessage, ServerResponse } from 'node:http';
import { db } from './database'

export const config = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                console.log('ITS GET!', req)
                const users = await db.getUsers()
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify(users))
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