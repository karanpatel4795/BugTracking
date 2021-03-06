const TaskModel = require("../model/task-model")


//add [ POST ]
module.exports.addTask = function (req, res) {

    let taskName = req.body.taskName
    let description = req.body.description
    let totalTime = req.body.totalTime
    // let startDate = req.body.startDate
    let moduleId = req.body.moduleId
    let projectId = req.body.projectId
    let statusId = "622b5606f4370ecb2982e488"
    let priorityId = req.body.priorityId
    let assigned = false

    let task = new TaskModel({
        taskName: taskName,
        description: description,
        totalTime: totalTime,
        //startDate: startDate,
        projectId: projectId,
        moduleId: moduleId,
        statusId: statusId,
        priorityId: priorityId,
        assigned: assigned
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
module.exports.deleteTask = function (req, res) {
    //params userid 
    let taskId = req.params.taskId //postman -> userid 

    TaskModel.deleteOne({ _id: taskId }, function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "delete...", data: data, status: 200 })//http status code 
        }
    })
}


//update 
module.exports.updateTask = function (req, res) {
    //params userid 
    let taskId = req.body.taskId //postman -> userid 
    let taskName = req.body.taskName
    let description = req.body.description
    let priority = req.body.priority
    let totalTime = req.body.totalTime
    TaskModel.updateOne({ _id: taskId }, { taskName: taskName, description: description, priority: priority, totalTime: totalTime }, function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "task update...", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getTaskById = function (req, res) {
    let taskId = req.params.taskId
    TaskModel.findOne({ _id: taskId }).populate("moduleId").populate("priorityId").populate("projectId").populate("developerId").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getTaskbyProject = function (req, res) {
    let projectId = req.body.projectId
    let statusId = req.body.statusId
    //console.log(projectId);
    if (statusId == "") {
        TaskModel.find({ projectId: projectId }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
            if (err) {
                res.json({ msg: "Something Wrong", status: -1, data: req.body })
            }
            else {
                console.log(tasks);
                res.json({ msg: "Data Retraive", status: 200, data: tasks })
            }
        })
    }
    else {
        TaskModel.find({ projectId: projectId, statusId: statusId }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
            if (err) {
                res.json({ msg: "Something Wrong", status: -1, data: req.body })
            }
            else {
                res.json({ msg: "Data Retraive", status: 200, data: tasks })
            }
        })
    }
}

module.exports.getTask = function (req, res) {
    let projectId = req.params.projectId
    //console.log(projectId);
    TaskModel.find({ projectId: projectId, assigned: false }, function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(tasks);
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.getTaskbyModule = function (req, res) {
    let moduleId = req.params.moduleId
    TaskModel.find({ moduleId: moduleId }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.getTaskbyStatus = function (req, res) {
    let statusId = req.params.statusId
    TaskModel.find({ statusId: statusId }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.getTaskbyTester = function (req, res) {
    let testerId = req.params.testerId

    TaskModel.find({ testerId: testerId }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.getPendingTaskforTester = function (req, res) {
    let testerId = req.params.testerId

    TaskModel.find({ testerId: testerId, statusId: { $ne: "620fbb47afe355342d2bd547" } }).populate("statusId").populate("priorityId").populate("moduleId").populate("projectId").exec(function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: tasks })
        }
    })
}

module.exports.noBug = function (req, res) {
    let taskId = req.body.taskId
    let testerId = req.body.testerId
   // console.log(taskId);
    TaskModel.find({ testerId: testerId, _id: taskId }, function (err, tasks) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            TaskModel.updateOne({ _id: taskId }, { bugStatus: "625030ca592b3cd09e3a96de",statusId:"620fbb47afe355342d2bd547" }, function (err, success) {
                if (err) {
                    res.json({ msg: "Something Wrong", status: -1, data: req.body })
                }
                else {
                    res.json({ msg: "Task Tested!", status: 200, data: tasks })
                }
            })
        }
    })
}
module.exports.getfixedBugs = function (req, res) {
    TaskModel.find({ bugStatus: "625030ca592b3cd09e3a96de" },function (err, data) {
        if (err) {
            res.json({ msg: "Somthing went wrong", data: err, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Data Retraive!", data: data, status: 200 })//http status code 
        }
    })
}