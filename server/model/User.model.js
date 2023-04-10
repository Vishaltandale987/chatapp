

const mongoose = require("mongoose")


const commentSchema = mongoose.Schema({
  userId:String,
  comment:String
})


const postSchema =  mongoose.Schema({
    post_image: String,
    description: String,
    like: Number,
    all_comment: [commentSchema]
    
})


const userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    password: String,
    email: String,
    avatar: String,
    coverimg: String,
    post: [postSchema]
    

})

const UserModel = mongoose.model("user", userSchema)
module.exports = {
    UserModel
}


// {
//     "lastName": "gpaa",
//     "firstName": "gpaa",
//     "password": "gpaa",
//     "email": "gpaa@gmial.com",
//     "avatar": "ass",
//     "coverimg": "ass",
//     "post": [
//         {
//             "post_image": "ass",
//             "description": "dsa",
//             "like": 1,
//             "all_comment": [
//                 {
//                     "userId": "ass",
//                     "comment": "good"
//                 }
//             ]
//         }
//     ]
// }