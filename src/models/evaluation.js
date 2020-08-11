const mongoose = require('mongoose');
const { Schema } = mongoose;

const EvoluationSchema = new Schema({
    name: { type: String, require: true, unique: true },
    type: { type: Number, require: true },
    selfevaluation: { type: Number, require: true }

});

module.exports = mongoose.model('Evoluation', EvoluationSchema);