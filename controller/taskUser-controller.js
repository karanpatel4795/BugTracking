const TaskModel = require("../model/task-model")
const TaskUserModel = require("../Model/taskUser-model")
const taskUserModel = require("../Model/taskUser-model")

//add data to table
module.exports.addTaskUser = function (req, res) {
    const taskUser = req.body.taskUser
    const taskId = req.body.taskId
    const status = "Pending"

    let TaskUser = new taskUserModel({
        taskUser: taskUser,
        taskId: taskId,
        status:status
    })
    TaskUser.save(function (err, success) {
        if (err) {
            //console.log(err);
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            TaskModel.updateOne({ _id: taskId }, { assigned: true }, function (err, success) {
                res.json({ msg: "Task Assigned", status: 200, data: success })
            })
        }
    })
}
//list
module.exports.getAllTaskUser = function (req, res) {
    TaskUserModel.find().populate("taskUser").populate("taskId").exec(function (err, roles) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: roles })
        }
    })
}
//delete
module.exports.deleteTaskUser = function (req, res) {
    let taskUser = req.params.taskUser
    let taskId = req.body.taskId
    TaskUserModel.deleteOne({ _id: TaskUserId }, { taskUser: taskUser }, { taskId: taskId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Delete Successfully", status: 200, data: data })
        }
    })
}
module.exports.getTaskbyDevelop = function (req, res) {
    let userId = req.body.devId
    let statusId = req.body.statusId
    //console.log(userId);
    TaskUserModel.find({ taskUser: userId }).populate("taskId").populate("taskUser").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}
module.exports.getPendingTaskforDev = function (req, res) {
    let devId = req.params.devId
    TaskUserModel.find({ taskUser: devId,status:"Pending" }).populate("taskId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}