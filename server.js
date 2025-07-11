import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import serverless from 'serverless-http';
import dbConnect from './src/Config/dbConnect.js'

export default serverless(async (req, res) => {
  try {
    return await app(req, res);
  } catch (err) {
    console.error('🔥 Uncaught handler error:', err);
    res.status(500).send('Internal Server Error');
  }
});
dbConnect()
const Port = process.env.PORT

app.listen(Port, ()=>{
    console.log(`server is connected ${Port}`)
})