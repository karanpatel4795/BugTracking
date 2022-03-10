const ProjectModel = require("../Model/project-model")

//add data to table
module.exports.addProject=function (req,res){
    const projectTitle = req.body.projectTitle  
    const projectManagerID = req.body.projectManagerID
    const description = req.body.description
    const technology = req.body.technology
    const estimatedHours = req.body.estimatedHours
    //const startDate = req.body.startDate
    const complitionHours = req.body.complitionHours
    const statusId = req.body.statusId

    
    let project = new ProjectModel({
        projectTitle:projectTitle,
        projectManagerID:projectManagerID,
        description:description,
        technology:technology,
        estimatedHours:estimatedHours,
      //  startDate:startDate,
        complitionHours:complitionHours,
        statusId:statusId
    })
    project.save(function(err,success){
        if(err){
            console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:req.body})        
        }
        else{
            res.json({msg:"Project added",status:200,data:success})
        }
    })
}
//list
module.exports.getAllProject = function(req,res){
    ProjectModel.find().populate("statusId").exec(function(err,project){
        if(err){
            //console.log(err);
            res.json({msg:"Something Wrong",status:-1,data:err})
        }
        else{
            res.json({msg:"Data Retraive",status:200,data:project})
        }
    })
}
//delete
module.exports.deleteProject = function(req,res){
    let projectId = req.params.projectId
    ProjectModel.deleteOne({_id:projectId},function(err,data) {
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Delete Successfully",status:200,data:data})
        }
    })
}
//update
module.exports.updateproject = function(req,res){
    let projectId = req.body.projectId
    let projectTitle = req.body.projectTitle
    let description = req.body.description

    ProjectModel.updateOne({_id:projectId},{projectTitle:projectTitle},{description:description},function(err,data){
        if(err){
            res.json({msg:"Something Wrong",status:-1,data:req.body})
        }
        else{
            res.json({msg:"Data Updated",status:200,data:data})
        }
    })
}
