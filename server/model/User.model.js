const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    lastName:String,
    fristName:String,
    password:String,
    email:String,
    avatar:String,
    coverimg:String,
    post: [{ post_image: String, description:String, like: Number,comment:Array }],

    
})

const UserModel=mongoose.model("user",userSchema)
module.exports={
    UserModel
}