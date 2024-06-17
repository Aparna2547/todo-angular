import mongoose, { Schema } from "mongoose";


const noteSchema = new Schema({
    
    content:{
        type:String
    },
    createdAt:{
        type:Date,
    }
})

const Note = mongoose.model("Note",noteSchema)
export default Note