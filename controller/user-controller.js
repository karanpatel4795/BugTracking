const bcrypt = require("bcrypt")
const UserModel = require("../Model/user-model")

//add user
module.exports.addUser = function(req,res){
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let isActive = 1 

    let encPassword = bcrypt.hashSync(password,10)

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role,
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
    let isActive = req.body.isActive

    UserModel.updateOne({_id:userId},{firstName:firstName},{password:password},{isActive:isActive},function(err,data){
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

    let isCorrect = false; 

    UserModel.findOne({email:param_email},function(err,data){
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