import { Router } from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getUser, getUsers, signIn, signUp } from '../controllers/users.controllers.js'

const router = Router()

router.get('/users', verifyToken, getUsers)

router.get('/users/:email', verifyToken, getUser)

router.post('/signin', signIn)

router.post('/signup', signUp)

export default router