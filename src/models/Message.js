import { Schema, model } from 'mongoose'

const messageSchema = new Schema({
    room: String,
    from: String,
    email: String,
    message: String
}, { timestamps: true })

export default model('Message', messageSchema)