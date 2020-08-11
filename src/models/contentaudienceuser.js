const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentAudienceUserSchema = new Schema({
    content: { type: String, require: true },
    audience: { type: String, require: true },
    user: { type: String, require: true }
});

module.exports = mongoose.model('ContentAudienceUser', ContentAudienceUserSchema);