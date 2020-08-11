const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentTypeSchema = new Schema({
    name: { type: String, require: true, unique: true }
});

module.exports = mongoose.model('ContentType', ContentTypeSchema);