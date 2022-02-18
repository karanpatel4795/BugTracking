const express = require("express")
const mongoose = require("mongoose")

const sessionController = require("./controller/session-contoller")

const roleController = require("./controller/role-controller")
const userController = require("./controller/user-controller")
const statusController = require("./controller/status-controller")
const priorityController = require("./controller/priority-controller")

const app = express()

//middle ware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/BugTracking',function(err){
    if(err){
        console.log("Connection not Established");
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
})
app.get("/",function(req,res){
    res.write("Welcome.....")
    res.end()
})
/*app.get("/login")
app.listen(3000,function(){
    console.log("server started on 3000");
})
app.get("/login",function(req,res){
    res.write("Login...")
    res.end()
})
app.get("/signup",function(req,res){
    res.write("Signup...")
    res.end()
})*/
app.get("/login",sessionController.login)
app.get("/signup",sessionController.signup)
app.post("/saveuser",sessionController.saveuser)

//role
app.post("/roles",roleController.addRole)
app.get("/roles",roleController.getAllRoles)
app.delete("/roles/:roleId",roleController.deleteRoles)
app.put("/roles",roleController.updateRole)

//user
app.post("/users",userController.addUser)
app.get("/users",userController.getAllUser)
app.delete("/users/:userId",userController.deleteUser)
app.put("/users",userController.updateUser)

//status
app.post("/status",statusController.addStatus)
app.get("/status",statusController.getAllStatus)
app.delete("/status/:statusId",statusController.deleteStatus)
app.put("/status",statusController.updateStatus)

//priority
app.post("/priority",priorityController.addPriority)
app.get("/priority",priorityController.getAllPriority)
app.delete("/priority/:priorityId",priorityController.deletePriority)
app.put("/priority",priorityController.updatePriority)

//server
app.listen(3000,function(){
    console.log("server started on 3000");
})