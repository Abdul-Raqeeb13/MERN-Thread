import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(express.urlencoded({extended : true }))
app.use(cookieParser())

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log("Server is running");

})