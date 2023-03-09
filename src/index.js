import server from './app.js'
import database from './database.js'
import { PORT } from './config.js'

database()

server.listen(PORT)