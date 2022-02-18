const mongoose = require("mongoose")

let StatusSchema = new mongoose.Schema({
statusName:{
    type:String
    },
isActive:{
    type:Number
    }
})
//modal
const StatusModel = mongoose.model("status",StatusSchema)
module.exports = StatusModel;