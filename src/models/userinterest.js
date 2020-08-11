const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserInterestSchema = new Schema({
    user: { type: String, require: true },
    interest: { type: String, require: true }
});

module.exports = mongoose.model('UserInterest', UserInterestSchema);