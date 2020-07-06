const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
     },
    description: { type: String, require: true },
    answer: { type: String, require: true }
});

module.exports = mongoose.model('Question', QuestionSchema);