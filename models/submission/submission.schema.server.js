var mongoose = require('mongoose');
var submissionSchema = mongoose.Schema({
    username: String,
    quizId: String,
    answers: Object
}, {collection: 'submissions'});
module.exports = submissionSchema;