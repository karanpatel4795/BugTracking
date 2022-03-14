const TaskModel = require("../model/task-model")


//add [ POST ]
module.exports.addTask = function (req, res) {

    let taskName = req.body.taskName
    let description = req.body.description
    let totalTime = req.body.totalTime
   // let startDate = req.body.startDate
    let moduleId = req.body.moduleId
    let projectId= req.body.projectId
    let statusId = "622b5606f4370ecb2982e488"
    let priorityId = req.body.priorityId

    let task = new TaskModel({
        taskName: taskName,
        description: description,
        totalTime: totalTime,
        //startDate: startDate,
        projectId :projectId,
        moduleId:moduleId,
        statusId:statusId,
        priorityId:priorityId
    })

  //  console.log(task);
    task.save(function (err, data) {
        if (err) {
            res.json({ msg: "something wrong", data: err, status: -1 })
        } else {
            res.json({ msg: "task added", data: data, status: 200 })
        }
    })


}
//list
module.exports.getAllTask = function (req, res) {

    TaskModel.find().populate("priorityId").populate("moduleId").populate("projectId").populate("statusId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task retraive", data: data, status: 200 })//http status code 
        }
    })
}

//delete
module.exports.deleteTask = function(req,res){
    //params userid 
    let taskId = req.params.taskId //postman -> userid 

    TaskModel.deleteOne({_id:taskId},function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateTask = function(req,res){
    //params userid 
    let taskId = req.body.taskId //postman -> userid 
    let taskName = req.body.taskName
    let description=req.body.description
    let priority = req.body.priority
    let totalTime = req.body.totalTime
    TaskModel.updateOne({_id:taskId},{taskName:taskName,description:description,priority:priority,totalTime:totalTime   },function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task update...", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getTaskById = function (req, res) {
    let taskId = req.params.taskId
    TaskModel.findOne({ _id: taskId }).populate("moduleId").populate("priorityId").populate("projectId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}