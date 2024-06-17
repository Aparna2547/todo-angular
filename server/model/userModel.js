import mongoose, { Schema } from "mongoose";

const schema = new Schema({
    name:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    }
})

const User = mongoose.model("User",schema)
export default User