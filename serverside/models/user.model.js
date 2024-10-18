import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email:{type:String},
    username:{type:String},
    password:{type:String},
    place:{type:String},
    address:{type:String},
    profile:{type:String},
    pincode:{type:Number},
    phone:{type:Number},
    otp:{type:String}
})
export default mongoose.model.Users||mongoose.model("User",userSchema)
