import { IncomingMessage, ServerResponse } from 'node:http';

export const config = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                console.log('ITS GET!', req)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.write(JSON.stringify('Its OK!'))
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