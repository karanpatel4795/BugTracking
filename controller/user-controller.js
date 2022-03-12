const bcrypt = require("bcrypt")
const UserModel = require("../Model/user-model")

//add user
module.exports.addUser = function(req,res){
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let gender = req.body.gender
    let contactNumber = req.body.contactNumber
    let isActive = 1 

    let encPassword = bcrypt.hashSync(password,10)

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role,
        gender: gender,
        contactNumber:contactNumber,
        isActive : isActive
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
            res.json({msg:"USer List",status:200,data:data})
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

//update user data
module.exports.updateUser = function(req,res){
    let userId = req.body.userId
    let firstName = req.body.firstName
    //let password = req.body.password
    //let isActive = req.body.isActive

    UserModel.updateOne({_id:userId},{firstName:firstName},function(err,data){
        if(err){
            res.json({msg:"Somethiing Wrong...",status:-1,data:req.body})
        }else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}

module.exports.login = function(req,res){

    let param_email = req.body.email
    let param_password  = req.body.password 

    let isCorrect = false

    UserModel.findOne({email:param_email}).populate("role").exec(function(err,data){
        if(data){
            let ans =  bcrypt.compareSync(param_password,data.password)
            if(ans == true){
                    isCorrect = true
            }
        }
    
        if (isCorrect == false) {
            res.json({ msg: "Invalid Email/Password...", data: req.body, status: -1 })//-1  [ 302 404 500 ]
        } else {
            res.json({ msg: "Login....", data: data, status: 200 })//http status code 
        }
    })
}

module.exports.getUserById = function(req,res){
    let userId = req.params.userId
    UserModel.findOne({_id:userId},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:data})
        }
    })
}

module.exports.getAllManager = function(req,res){
    UserModel.find({role:"6228f0b812209b8603f2d88c"},function(err,managers){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
           //console.log(managers)
            res.json({msg:"Data Retraive",status:200,data:managers})
        }
    })
}