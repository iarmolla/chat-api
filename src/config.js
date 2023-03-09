import { config } from "dotenv"

config()

export const secret = 'secretToken'
export const PORT = process.env.PORT
export const MONGO_URL = process.env.MONGO_URL

