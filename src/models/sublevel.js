const mongoose = require('mongoose');
const { Schema } = mongoose;

const SublevelSchema = new Schema({
    name: { type: String, require: true, unique: true },
    quadrant: { type: String, require: true},
});

module.exports = mongoose.model('Sublevel', SublevelSchema);