//require('dotenv').config({path:'./env'})
import { app } from './app.js'
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 5000,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed!!!",err)
})


/*FIRST APPROACH
import express from "express"
const app=express()

// function connectDB(){}
// connectDB()
( async()=>{
    try{
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",(error)=>{// express eventlistener(on)
        console.log("ERR:",error);
        throw error
     })

     app.listen(process.env.PORT,()=>{
        console.log(`APp is listening on port ${process.env.PORT}`);
     })
    }catch(error){
        console.error("ERROR:",error);
        throw error;
    }
})()*/