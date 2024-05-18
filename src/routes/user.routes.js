//import express from "express"
import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router=Router()
//uploading files using multer.middleware
router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
           name:"coverImage",
           maxCount:1 
        }
    ])
    ,registerUser)
    //with this , we can upload images (objec.fields())
 

export default router;