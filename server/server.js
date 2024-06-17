import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import router from './routes.js'
import cors from 'cors'

const app = express()


const connectDB = async()=>{
    try {
       const uri = 'mongodb://localhost:27017' 
       await mongoose.connect(uri)
       console.log('db connected');
    } catch (error) {
        console.log(error);
    }
}

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(
    cors({
        origin:'http://localhost:4200',
        methods:['GET','POST','PUT',"DELETE"]
    })
)

app.use(cookieParser())
app.use('/api/user',router)

app.listen(3000,()=>{
    console.log('server is running');
})