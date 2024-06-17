
import express from 'express'
import { Login, Signup } from './controller/userController.js'
import { addNote, deleteNote, editNote, editNoteData, getNote } from './controller/noteController.js'
const router = express.Router()


router.post('/signup',Signup)
router.post('/login',Login)
router.post('/addnote',addNote)
router.get('/allnotes',getNote)
router.put('/editnote',editNote)
router.get('/data',editNoteData )
router.delete('/deleteNote/:id',deleteNote)

export default router