const mongoose = require("mongoose")

let UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require:true
    },
    password: {
        type:String,
        require:true
    },
    role : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"role"
    },
    isAcive:{
        type:Boolean
    },
    gender:{
        type:String
    },
    contactNumber:{
        type:String
    },
    OTP:{
        type:String
    }
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel