const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResultProfileSchema = new Schema({
    user: { type: String, require: true },
    evaluation: { type: Number, require: true },
    result: { type: Number, require: true }
});

module.exports = mongoose.model('ResultProfile', ResultProfileSchema);