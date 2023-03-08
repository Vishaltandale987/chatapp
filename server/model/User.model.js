const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fristname:String,
    lastname:String,
    avatar:String,
    password:String,
    email:String,
    post: [{ image: String, like: Number,comment:Array }],
    
})

const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}