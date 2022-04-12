const mongoose = require("mongoose")

let TaskUserSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    },
    taskUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    status: {
        type: String
    }
})
//modal
const TaskUserModel = mongoose.model("taskUser", TaskUserSchema)
module.exports = TaskUserModel;