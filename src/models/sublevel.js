const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuadrantSchema = new Schema({
    name: { type: String, require: true, unique: true },
    quadrant: { type: String, require: true},
});

module.exports = mongoose.model('Quadrant', QuadrantSchema);