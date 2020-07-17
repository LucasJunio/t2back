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
    description: { type: String, require: true }
});

module.exports = mongoose.model('Skill', SkillSchema);