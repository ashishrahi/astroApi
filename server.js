import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import serverless from 'serverless-http';
export default serverless(app);
import dbConnect from './src/Config/dbConnect.js'

dbConnect()
const Port = process.env.PORT

app.listen(Port, ()=>{
    console.log(`server is connected ${Port}`)
})