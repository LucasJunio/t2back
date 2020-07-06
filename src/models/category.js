const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
    },
    segment: { type: String, require: true }
});

module.exports = mongoose.model('Category', CategorySchema);


