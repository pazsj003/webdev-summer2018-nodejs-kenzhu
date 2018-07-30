module.exports = function (app) {

    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:quizId', findQuizById);
    app.post('/api/quiz/:quizId', submitQuiz);
    app.get('/api/quiz/:quizId/submissions', findSubmissionsForQuiz);

    // var quizzes = require('./quizzes.json');

    var submissionModel = require('../models/submission/submission.model.server');

    function findSubmissionsForQuiz(req, res) {
        var quizId = req.params.quizId;
        submissionModel
            .findSubmissionsForQuiz(quizId)
            .then(function (submissions) {
                res.json(submissions);
            });
    }

    function submitQuiz(req, res) {
        var submission = req.body;
        var quizId = req.params.quizId;
        submissionModel
            .submitQuiz(submission, quizId, 'alice')
            .then(function (submission) {
                res.json(submission);
            })
    }

    function findQuizById(req, res) {
        var quiz = quizzes.filter(function (q) {
            return q._id == req.params.quizId });
        res.json(quiz[0]);
    }

    function findAllQuizzes(req, res) {
        res.json(quizzes);
    }

}