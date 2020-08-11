const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResultProfileSchema = new Schema({
    user: { type: Number, require: true },
    elavuation: { type: Number, require: true },
    result: { type: Number, require: true }
});

module.exports = mongoose.model('ResultProfile', ResultProfileSchema);