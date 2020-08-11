const mongoose = require('mongoose');
const { Schema } = mongoose;

const OfficeSkillSchema = new Schema({
    office: { type: String, require: true},
    skill: { type: String, require: true},
});

module.exports = mongoose.model('OfficeSkill', OfficeSkillSchema);