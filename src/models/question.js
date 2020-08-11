const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    description: { type: String, require: true },
    type: { type: Number, require: true },
    skill: { type: String, require: true }
});

module.exports = mongoose.model('Question', QuestionSchema);