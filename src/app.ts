import http from 'node:http'
import { config } from './config'

const app = () => {
    console.log('The App is started!')

    const port = process.env.PORT || 4000
    const server = http.createServer(config)
    server.listen(port, () => {
        console.log(`App running on port ${port}!`)
    })
}

export default app