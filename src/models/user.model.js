import mongoose,{Schmema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar:{
        type:String,//cloudinary url
        required:true,

    },
    coverImage:{
        type:String,//cloudinary url
    },
    watchHistory:{
        type:mongoose.Schema.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String,
    }

},
{
    timestamps:true
})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    //if password is not modified then , the function 
    //immediately calls the next callback to proceed 
    //with the save operation without rehashing the
    // password.
    this.password =bcrypt.hash(this.password,10)
    //here  bcrypt encrypts password
    next() 
    /*Finally, the next callback is called to continue
     with the save operation. The user's password is
      now hashed and ready to be saved to the database.*/
})
//custom methods
userSchema.methods.isPasswordCorrect=async function
(password){
     return await bcrypt.compare(password,this.password)
//Here bcrypt verifies password with encrypted password
}
//refresh tokens are stored in database while access tokens aer not stored

userSchema.methods.generateAcccessToken=function(){
    //generates access token
  return jwt.sign(
    {
     _id:this._id,
     email:this.email,
     username:this.username,
     fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=function(){
    //generates refresh token
    return jwt.sign(
        {
         _id:this._id,
        
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User=mongoose.model("User",userSchema)