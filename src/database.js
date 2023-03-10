import mongoose from 'mongoose'
import { MONGO_URL } from './config.js'

mongoose.set("strictQuery", false);
// mongoose.connect('mongodb://localhost:27017/guitars')

async function initDb() {
    const url = 'mongodb+srv://iarmolla:iarmolla@cluster0.fpopr8i.mongodb.net/users?retryWrites=true&w=majority'
   mongoose.connect(url).then((res) => console.log('Conectado a mongodb')).catch((error) => console.log(error))
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
export default initDb