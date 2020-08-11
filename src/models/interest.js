const mongoose = require('mongoose');
const { Schema } = mongoose;

const InterestSchema = new Schema({
    name: { type: String, require: true, unique: true }
});

module.exports = mongoose.model('Interest', InterestSchema);