const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuadrantSchema = new Schema({
    name: { type: String, require: true, unique: true },
});

module.exports = mongoose.model('Quadrant', QuadrantSchema);