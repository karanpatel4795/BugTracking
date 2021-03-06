const bcrypt = require("bcrypt")
const UserModel = require("../Model/user-model")

//add user
module.exports.addUser = function (req, res) {
    let firstName = req.body.firstName
    let email = req.body.email
    let password = req.body.password
    let role = req.body.role
    let status = "Pending"
    let gender = req.body.gender
    let contactNumber = req.body.contactNumber
    let isActive = false;
    let projectAssigned = false;
    let activeProject = false;

    let encPassword = bcrypt.hashSync(password, 10)

    let user = new UserModel({
        firstName: firstName,
        email: email,
        password: encPassword,
        role: role,
        status: status,
        gender: gender,
        contactNumber: contactNumber,
        isActive: isActive,
        projectAssigned: projectAssigned,
        activeProject: activeProject
    })

    user.save(function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong...", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "User Added Sucessfully", status: 200, data: data })
        }
    })
}
//list user
module.exports.getAllUser = function (req, res) {
    UserModel.find({ role: { $not: { $eq: "6228efe612209b8603f2d880" } } }).populate("role").exec(function (err, data) {
        if (err) {
            res.json({ msg: "Somethiing Wrong...", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "USer List", status: 200, data: data })

        }
    })
}
module.exports.usersforProjectManager = function (req, res) {
    UserModel.find(
        { role: { $nin: ["6228efe612209b8603f2d880", "6228f0b812209b8603f2d88c"] } }

    ).populate("role").exec(function (err, data) {
        if (err) {
            console.log(err);
            res.json({ msg: "Somethiing Wrong...", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "USer List", status: 200, data: data })
        }
    })
}
//delete user
module.exports.deleteUser = function (req, res) {
    let userId = req.params.userId
    UserModel.deleteOne({ _id: userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Somethiing Wrong...", status: -1, data: req.body })
        } else {
            res.json({ msg: "User Deleted", status: 200, data: data })
        }
    })
}
//update user data
module.exports.updateUser = function (req, res) {
    let userId = req.body.userId
    let firstName = req.body.firstName
    //let password = req.body.password
    //let isActive = req.body.isActive

    UserModel.updateOne({ _id: userId }, { firstName: firstName }, function (err, data) {
        if (err) {
            res.json({ msg: "Somethiing Wrong...", status: -1, data: req.body })
        } else {
            res.json({ msg: "Data Updated", status: 200, data: data })
        }
    })
}
module.exports.login = function (req, res) {

    let param_email = req.body.email
    let param_password = req.body.password

    let isCorrect = false
    UserModel.findOne({ email: param_email }).populate("role").exec(function (err, data) {
        if (data.isActive == true) {
            let ans = bcrypt.compareSync(param_password, data.password)
            if (ans == true) {
                isCorrect = true
            }
        }
        else {
            res.json({ msg: "Admin Approval is Pending", data: req.body, status: -1 })
        }

        if (isCorrect == false) {
            res.json({ msg: "Invalid Email/Password...", data: req.body, status: -1 })
        } else {
            res.json({ msg: "Login....", data: data, status: 200 })//http status code 
        }
    })
}
module.exports.getUserById = function (req, res) {
    let userId = req.params.userId
    UserModel.findOne({ _id: userId }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.getAllManager = function (req, res) {
    UserModel.find({ role: "6228f0b812209b8603f2d88c" }, function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(managers)
            res.json({ msg: "Data Retraive", status: 200, data: managers })
        }
    })
}
module.exports.disableUser = function (req, res) {
    let userId = req.body.userId
    // console.log(userId);
    UserModel.updateOne({ _id: userId }, { isActive: false, status: "Disable" }, function (err, data) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: err })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: data })
        }
    })
}
module.exports.pendingusers = function (req, res) {
    UserModel.find({ isActive: false }).populate("role").exec(function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: managers })
        }
    })
}
module.exports.approveUser = function (req, res) {
    let userId = req.body.userId
    //console.log(userId)
    UserModel.updateOne({ _id: userId }, { isActive: true, status: "Approved" }, function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "User Approved", status: 200, data: managers })
        }
    })
}
module.exports.changePassword = function (req, res) {
    let emailParam = req.body.email
    let cps = req.body.cps
    let nps = req.body.nps
    let cnps = req.body.cnps
    let isCorrect = false
    //console.log(emailParam);
    UserModel.findOne({ email: emailParam }, function (err, data) {
    //console.log(data);
        let ans = bcrypt.compareSync(cps, data.password)
        if (ans == true) {
            isCorrect = true
        }
        if (isCorrect == false) {
            res.json({ msg: "Current Password is Not Valid!", data: req.body, status: -1 })
        } else {
            if (nps == cnps) {
                let encPassword = bcrypt.hashSync(nps, 10)
                UserModel.updateOne({ email: emailParam }, { password: encPassword }, function (err, data) {
                    res.json({ msg: "Password Changed!", status: 200, data: data })
                })
            }
            else {
                res.json({ msg: "New Password and Confirm Password Not Matched!", status: -1, data: err })
            }
        }
    })
}
module.exports.getAllManagers = function (req, res) {
    UserModel.find({ role: "6228f0b812209b8603f2d88c", projectAssigned: false, isActive: true }, function (err, managers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            //console.log(managers)
            res.json({ msg: "Data Retraive", status: 200, data: managers })
        }
    })
}
module.exports.getAllDeveloper = function (req, res) {
    UserModel.find({ role: "6228efec12209b8603f2d882", projectAssigned: false, isActive: true }, function (err, developers) {
        if (err) {

            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {

            res.json({ msg: "Data Retraive", status: 200, data: developers })
        }
    })
}
module.exports.getAllTester = function (req, res) {
    UserModel.find({ role: "6228eff112209b8603f2d884", projectAssigned: false, isActive: true }, function (err, testers) {
        if (err) {

            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {

            res.json({ msg: "Data Retraive", status: 200, data: testers })
        }
    })
}
module.exports.getUserbyRole = function (req, res) {
    let role = req.params.role
    //console.log(role);
    UserModel.find({ role: role }, function (err, testers) {
        if (err) {
            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {
            res.json({ msg: "Data Retraive", status: 200, data: testers })
        }
    })
}
module.exports.getAllDevs = function (req, res) {
    UserModel.find({ role: "6228efec12209b8603f2d882", isActive: true }, function (err, developers) {
        if (err) {

            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {

            res.json({ msg: "Data Retraive", status: 200, data: developers })
        }
    })
}

module.exports.getuserName = function (req, res) {
    let userId = req.params.userId
    //console.log(userId);
    UserModel.find({ _id: userId }, function (err, developers) {
        if (err) {

            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {

            res.json({ msg: "Data Retraive", status: 200, data: developers })
        }
    })
}

module.exports.getUsersById = function (req, res) {
    let userId = req.params.userId
    //console.log(userId);
    UserModel.find({ email: userId }, function (err, developers) {
        if (err) {

            res.json({ msg: "Something Wrong", status: -1, data: req.body })
        }
        else {

            res.json({ msg: "Data Retraive", status: 200, data: developers })
        }
    })
}