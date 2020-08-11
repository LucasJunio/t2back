const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentSkillSchema = new Schema({
    content: { type: String, require: true },
    skill: { type: String, require: true },
});

module.exports = mongoose.model('ContentSkill', ContentSkillSchema);