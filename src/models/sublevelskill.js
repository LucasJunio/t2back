const mongoose = require('mongoose');
const { Schema } = mongoose;

const SublevelSkillSchema = new Schema({
    sublevel: { type: String, require: true},
    skill: { type: String, require: true},
});

module.exports = mongoose.model('SublevelSkill', SublevelSkillSchema);