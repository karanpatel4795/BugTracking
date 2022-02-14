const express = require("express")
const sessionController = require("./controller/session-contoller")
const app = express()
//middle ware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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
app.listen(3000,function(){
    console.log("server started on 3000");
})