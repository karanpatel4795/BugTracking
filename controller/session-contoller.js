const fs = require("fs")

function login(req,res){
    res.write("Login")
    res.end()
}
function signup(req,res){
    let signupHtml = fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()
}
function saveuser(req,res){
    console.log(req.body)
    res.json({msg:"Data Done...",status:200,data:res.body})
}
function sendOTP(req,res){
    let emailParam  = req.body.email 
    UserModel.find({email:emailParam},function(err,data){
        if(err){
            res.json({status:-1,msg:"Something Wrong!",data:err})
        }else{
            if(data.length != 0){
                let myotp = parseInt(Math.random()*1000000)
                UserModel.updateOne({email:emailParam},{OTP:myotp},function(err,success){
                    res.json({status:200,msg:"OTP sent to Your Email!",data:""})
                })           

            }else{
                res.json({status:-1,msg:"Invalid Email",data:err})
            }
        }
    })            
}
module.exports.login = login
module.exports.signup = signup
module.exports.saveuser = saveuser
module.exports.sendOTP = sendOTP