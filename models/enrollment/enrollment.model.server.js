var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function unenrollSection(enroll){
    console.log("delete in enorll insde " + JSON.stringify(enroll));
    return enrollmentModel.deleteOne({_id:enroll._id},
        function(err,data){
            if(err){
                console.log("err")
            }
            else{
                console.log("body1" + data)
                return data;
            }
        })
}
function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function CheckSectionForStudent(studentId,sectionId) {
    return enrollmentModel
        .findOne({student:studentId,section:sectionId})

}

function findSectionsForStudent(studentId) {
    console.log(" studnet Id in findsection " +studentId);
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    CheckSectionForStudent: CheckSectionForStudent,
    unenrollSection:unenrollSection,
};