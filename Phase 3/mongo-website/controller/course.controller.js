let courseModel = require('../model/course.model');

let addCourse = (request,response) => {
    let course = new courseModel({
        _id: request.body.cid,
        name: request.body.cname,
        description: request.body.desc,
        amount: request.body.amt
    });
    courseModel.insertMany([course], (err,result)=>{
        if(!err){
            response.send("Record stored successfully")
        }else{
            response.send(err);
        }
    });
}

let listCourses = (request,response) => {
    courseModel.find({}, (err,result) => {
        if(!err){
            response.json(result)
        }else{
            response.send(err);
        }
    });
}

let deleteCourse = (request,response) => {
    let cid = request.params.cid;
    courseModel.deleteOne({_id:cid}, (err,result) => {
        if(!err){
            if(result.deletedCount>0){
                response.send("SUCCESS: Course Deleted!")
            } else {
                response.send("ERROR: Course Not Found!");
            }
        } else {
            response.send(err);
        }
    });
}

let updateCourse = (request,response) => {
  let cid = request.body.cid;
  let amt = request.body.amt;
  courseModel.updateOne({_id:cid}, {$set:{amount:amt}}, (err,result) => {
        if(!err){
            if(result.matchedCount>0){
                response.send("SUCCESS: Course Updated!")
            } else {
                response.send("ERROR: Course Not Found!");
            }
        } else {
            response.send(err);
        }
    });
}

module.exports = {
    addCourse,
    listCourses,
    deleteCourse,
    updateCourse
}
