import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    color: String
}, { timestamps: true })

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function validatePassword(password) {
    return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)