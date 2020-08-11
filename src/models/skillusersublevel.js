const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillUserSublevelSchema = new Schema({
    skill: { type: String, require: true },
    user: { type: String, require: true },
    sublevel: { type: String, require: true }
});

module.exports = mongoose.model('SkillUserSublevel', SkillUserSublevelSchema);