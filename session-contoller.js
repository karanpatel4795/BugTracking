const fs = require("fs")

function login(req,res){
    let LoginHtml = fs.readFileSync("./views/login.html")
    res.write(LoginHtml)
    res.end()
}
function signup(req,res){
    let signupHtml = fs.readFileSync("./views/Signup.html")
    res.write(signupHtml)
    res.end()
}
function saveuser(req,res){
    console.log(req.body)
    res.write("Data Saved")
    res.end()
}
module.exports.login = login
module.exports.signup = signup
module.exports.saveuser = saveuser