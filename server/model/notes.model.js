const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    name:String,
    title:String,
    user:String
})

const NotesModel=mongoose.model("notes",notesSchema)
module.exports={
    NotesModel
}