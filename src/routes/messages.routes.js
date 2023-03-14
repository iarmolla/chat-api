import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getRoomMessages } from '../controllers/messages.controllers.js'

const router = Router()

router.get('/messages/:room', verifyToken, getRoomMessages)

export default router
