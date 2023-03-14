import Message from '../models/Message.js'

export const getRoomMessages = async (req, res) => {
    try {
        res.send(await Message.find({ room: req.params.room }))
    } catch (error) {
        res.send(error)
    }
}