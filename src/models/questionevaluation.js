const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionEvaluationSchema = new Schema({
    question: { type: String, require: true },
    evaluation: { type: String, require: true }
});

module.exports = mongoose.model('QuestionEvaluation', QuestionEvaluationSchema);