import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError }from "../utils/ApiError.js"
import { User }from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
 /*step1:get user details from user*/ 
    const {fullName,email,username,password}=req.body
    console.log("email:",email);
/*step2:validation(requires ApiError.js file).so import the file*/
/*if(fullName===" "){
    throw new ApiError(400,"Fullname is required")
}*///one way to validate
//another way
if([fullName,email,username,password].some((field)=> field?.trim()===""))
 {
  throw new ApiError(400,"All fields are required")
 }
 /*step3: check if user already exists or not (requires user.model.js) import the file*/
 const existedUser=User.findOne({
    $or:[{ username },{ email }]
 })
 if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
 }
 /*step4:check for images,avatars (since we added multer middleware in routes file,can access file)
 using req.files and use optional chaining*/
   const avatarLocalPath=req.files?.avatar[0]?.path
   const coverImageLocalPath=req.files?.coverImage[0]?.path
   //check for avatar
   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required")
   }
   /*step5:Upload on cloudinary(importing cloudinary.js) */
  const avatar=await uploadOnCloudinary(avatarLocalPath)
  const coverImage=await uploadOnCloudinary(coverImageLocalPath)
  /*step6:check whether avatar is properly uploaded or not */
  if(!avatar){
    throw new ApiError(400,"Avatar file is required")
   }
   /*step7:create user object-entry in db */
  const user=await User.create({
    fullName,
    avatar:avatar.url,
    /*validation for coverImage */
    coverImage:coverImage?.url||"",
    email,
    password,
    username:username.toLowerCase()
  })
/*step8,9:check for user creation and remove password,refreshtoken;import ApiResponse.js*/
  const createdUser=User.findById(user._id).select(
    "-password -refreshToken"
  )
  if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user")
  }
  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
  )
});

export {
    registerUser,
}