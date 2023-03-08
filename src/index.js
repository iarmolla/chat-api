import server from './app.js'
import database from './database.js'

database()

server.listen(3030, () => {
    console.log("ON PORT 3030")
})