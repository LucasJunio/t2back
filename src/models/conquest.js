const mongoose = require('mongoose');
const { Schema } = mongoose;

const ConquestSchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
     },
    type: { type: Number, require: true },
    punctuation: { type: Number, require: true },
});

module.exports = mongoose.model('Conquest', ConquestSchema);