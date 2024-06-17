import Note from "../model/noteModel.js";

export const addNote = async (req,res)=>{
    try {
        const {content} = req.body;
        console.log(content)
        const newNote = await Note({
            content,
            createdAt:Date.now()
        });
        await newNote.save();
        res.status(200).json({message:"note saved.."})
    } catch (error) {
        console.log(error);
    }
}

export const getNote =async (req,res)=>{
    try {
        const notes = await Note.find({})
        const data = await Note.find({}).sort({ createdAt: -1 });
        res.status(201).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const editNoteData = async(req,res)=>{
    try {
        const id = req.query.id;
        const data = await Note.findById(id)
        res.status(201).json({data})
    } catch (error) {
        res.status(401).json({message:"unable to fetch"})
    }
}



export const editNote = async(req,res)=>{
    try {
        console.log('hello amme');
        const id = req.query.id
        const {content} = req.body;
        console.log('hello ',id,content);

        const data = await Note.updateOne({_id:id},{$set:{content}})
        res.status(200).json({message:"Note Edited",data})
    } catch (error) {
        console.log(error);
    }
}

export const deleteNote = async (req,res) =>{
    try {
        console.log('haii ');
        const id = req.params.id;
        console.log(id)
        const data =  await Note.deleteOne({_id:id})
        console.log(data)
        res.status(201).json({message:"note deleted"})
    } catch (error) {
        console.log(error);
    }
}