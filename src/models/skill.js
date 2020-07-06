const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
    },
    category: { type: String, require: true },
    segment: { type: String, require: true },

});

module.exports = mongoose.model('Skill', SkillSchema);