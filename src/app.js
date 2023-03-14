import express, { json, urlencoded } from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import cors from 'cors'
import usersRoutes from './routes/users.routes.js'
import Message from './models/Message.js'
import messagesRoutes from './routes/messages.routes.js'
import User from './models/User.js'

const app = express()
const server = http.createServer(app)

const io = new SocketServer(server, {
    cors: {
        origin: '*'
    }
})

app.use(cors())

app.use(json())

app.use(urlencoded({ extended: false }))

app.use(usersRoutes)

io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room)
    })
    socket.on("exit", () => {
        socket.rooms.size === 0
    });
    socket.on('message', async (message, room, email) => {
        const color = await User.findOne({ email: email })
        const msg = new Message(
            {
                email: email,
                from: room,
                message: message,
                room: room,
                color: color.color
            }
        )
        await msg.save()
        socket.to(room).emit('received', await Message.find({ room: room }))
    })

})

app.use(messagesRoutes)

app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" })
})

export default server