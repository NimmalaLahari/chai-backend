import mongoose,{ Schema } from "mongoose"

const subscriptionSchema=new Schema({
  subscriber:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  channel:{
    type:Schemama.Types.objectId,
    ref:"User"
  },

},{timestamps: true})



export const Subscrption=mongoose.model("subscription",subscriptionSchema)