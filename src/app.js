import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
//express configurations
app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true 
    }
))

app.use(express.json({limit: "16kb"}))//for json data
app.use(express.urlencoded({extended: true,limit:"16kb"}))//extract data from url
app.use(express.static("public"))//configuring public assets
app.use(cookieParser())//


export{ app }