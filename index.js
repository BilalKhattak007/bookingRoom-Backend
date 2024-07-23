const express = require('express')
const app = express();
const mongoose =  require("mongoose")
const dotenv = require('dotenv').config()
const hotelRouter = require('./routes/hotelRoutes')
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes')
const roomRouter = require('./routes/roomRoutes')
const cookieParser = require('cookie-parser');

//middlewares & routes:
app.use(cookieParser())
app.use(express.json())
app.use('/api/hotels',hotelRouter)
app.use('/api',authRouter)
app.use('/api/users',userRouter)
app.use('/api/rooms',roomRouter)
//error middleware
app.use((err,req,res,next)=>{
    const errStatus = err.status || 500
    const errMessage = err.message || "Something went wrong"
    return res.status(errStatus).json({
        success:"false",
        status:errStatus,
        message:errMessage,
        stack:err.stack
    })
})
// Database connection:
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
//server
app.listen(8000,()=>{
    console.log("App running")
})