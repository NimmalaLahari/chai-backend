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
//middlewares
app.use(express.json({limit: "16kb"}))//for json data
app.use(express.urlencoded({extended: true,limit:"16kb"}))//extract data from url
app.use(express.static("public"))//configuring public assets
app.use(cookieParser())//

// app.listen(process.env.PORT,()=>{
//     console.log(`App is listening on port ${process.env.PORT}`)
// })

//routes import

import userRouter from './routes/user.routes.js'

//routes declaration(using middleware;as logic and route are written
    //in a separate files--so middlewares connect them)
app.use("/api/v1/users",userRouter)//a prefix route

/*app.on("error",(error)=>{
    console.log("ERR: ",error)
    throw error
})*/

export{ app }