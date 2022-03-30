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
    isActive:{
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
    },
    status:{
        type:String
    },
    projectAssigned:{
        type:Boolean
    },
    activeProject:{
        type:Boolean
    }
})

const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel