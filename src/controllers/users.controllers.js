import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config.js'

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.send(error)
    }
}

export const getUser = async (req, res) => {
    try {
        const query = req.params.email
        const users = await User.find({ email: query })
        res.status(200).json(users)
    } catch (error) {
        res.send(error)
    }
}

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).send({
                message: 'The email doesnt exists'
            })
        }
        const passwordIsValid = await user.validatePassword(req.body.password)
        if (passwordIsValid) {
            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 60 * 60 * 24
            })
            return res.json({
                auth: true,
                token
            })
        } else {
            return res.status(401).json(error)
        }
    } catch (error) {
        res.send(error)
    }
}

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            color: getRandomColor()
        })
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            return res.status(400).json({ message: 'The user is already registered' })
        }
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        const token = jwt.sign({ id: newUser._id }, secret, {
            expiresIn: 60 * 60 * 24
        })
        res.send({
            auth: true,
            token
        })
    } catch (error) {
        res.status(400).send({ error })
    }
}

function getRandomColor() {
    let colores = [];
    let num = (Math.floor(Math.random() * 4) * 4).toString(16);
    let letters = ['0', 'F', num];
    let color = '#';

    for (let i = 0; i < 3; i++) {
        let pos = Math.floor(Math.random() * letters.length);
        color += letters[pos];
        letters.splice(pos, 1);
    }

    if (colores.includes(color))
        return getRandomColor();
    else
        colores.push(color)
   return (color)
}