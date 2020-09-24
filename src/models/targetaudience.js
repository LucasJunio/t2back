const mongoose = require('mongoose');
const { Schema } = mongoose;

const TargetAudienceSchema = new Schema({
    gender: { type: Number, require: true },
    startingage: { type: Number, require: true },
    finalage: { type: Number, require: true },
    office: { type: String, require: true },
});

module.exports = mongoose.model('TargetAudience', TargetAudienceSchema);