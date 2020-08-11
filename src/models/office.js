const mongoose = require('mongoose');
const { Schema } = mongoose;

const OfficeSchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
    },
    department: { type: String, require: true }
});

module.exports = mongoose.model('Office', OfficeSchema);