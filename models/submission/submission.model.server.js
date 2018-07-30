var mongoose = require('mongoose');
var submissionSchema = require('./submission.schema.server');
var submissionModel = mongoose.model(
    'SubmissionModel',
    submissionSchema
);

function findSubmissionsForQuiz(quizId) {
    return submissionModel.find({quizId: quizId});
}

function findSubmissionsForUser(username) {
    return submissionModel.find({username: username});
}

function submitQuiz(submission, quizId, username) {
    return submissionModel.create({
        quizId: quizId,
        username: username,
        answers: submission
    });
}

module.exports = {
    submitQuiz: submitQuiz,
    findSubmissionsForQuiz: findSubmissionsForQuiz,
    findSubmissionsForUser: findSubmissionsForUser
};