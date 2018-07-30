module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/student/section/:sectionId', enrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.delete('/api/section/:sectionId', deleteSection);
    app.delete('/api/student/section/:sectionId',unenrollStudentSection)
    app.put('/api/section/:sectionId',updateSection);

    var sectionModel = require('../models/section/section.model.server');
    var enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForStudent(req, res) {
        var currentUser = req.session.currentUser;
        console.log("current user " + JSON.stringify(currentUser));
        if(currentUser ===undefined){
            res.sendStatus(404);
        }else{
            var studentId = currentUser._id;
            enrollmentModel
                .findSectionsForStudent(studentId)
                .then(function(enrollments) {
                    console.log("enorllments in find "+ JSON.stringify(enrollments));
                    res.json(enrollments);
                });
        }


    }

    function enrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;
        var enrollment = {
            student: studentId,
            section: sectionId
        };
        enrollmentModel
            .CheckSectionForStudent(studentId,sectionId)
            .then(function(match) {
                console.log('section id ' + match);
                if(match === null){
                    sectionModel
                        .decrementSectionSeats(sectionId)
                        .then(function () {
                            return enrollmentModel
                                .enrollStudentInSection(enrollment)
                        })
                        .then(function (enrollment) {
                            res.json(enrollment);
                        })

                }
                else{
                    console.log("not enrolled");
                    res.sendStatus(401);
                }

            });



    }

    function findSectionsForCourse(req, res) {
        var courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                    res.json(sections);
            })
    }
    function updateSection(req,res){
        var section = req.body;
        console.log("update in section 2 insde " + JSON.stringify(section));
        sectionModel
            .updateSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function deleteSection(req,res){
        var section = req.body;
        console.log("delete in section 2 insde " + JSON.stringify(section));
        sectionModel
            .deleteSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
    function unenrollStudentSection(req,res){
        var enroll = req.body;
        console.log("delete in section 2 insde " + JSON.stringify(enroll));
        sectionModel
            .incrementSectionSeats(enroll.section._id)
            .then(function () {
             return enrollmentModel.
                unenrollSection(enroll)
            })
            .then(function (enroll) {
                res.json(enroll);
            })
    }

    function createSection(req, res) {
        var section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }
};