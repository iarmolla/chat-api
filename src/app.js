import express, { json, urlencoded } from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'

const app = express()
const server = http.createServer(app)

const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())

app.use(json())

app.use(urlencoded({extended: false}))

app.use(usersRoutes)

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        socket.broadcast.emit('received',{
            body: message,
            from: socket.id
        })
    })
})

app.get('/', (req, res) => {
    res.send(200)
})

export default server