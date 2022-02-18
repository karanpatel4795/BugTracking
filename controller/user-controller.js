const UserModel = require("../Model/user-model")
const { saveuser } = require("./session-contoller")

//add user
module.exports.addUser = function(req,res){
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: password,
        role: role
    })

    user.save(function(err,data){
        if(err){
            res.json({msg:"Something Wrong...",status:-1,data:req.body})
        }
        else{
            res.json({msg:"User Added Sucessfully",status:200,data:data})
        }
    })
}

//list user
module.exports.getAllUser = function(req,res){
    UserModel.find().populate("role").exec(function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }
        else{
            res.json({msg:"USer List",status:200,dta:data})
        }
    })
}

//delete user
module.exports.deleteUser = function(req,res){
    let userId = req.params.userId
    UserModel.deleteOne({_id:userId},function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }else{
            res.json({msg:"User Deleted",status:200,data:data})
        }
    })
}

//uodate user data
module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let firstName = req.body.firstName
    let password = req.body.password
    UserModel.updateOne({_id:userId},{firstName:firstName},{password:password},function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}