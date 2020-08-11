const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserConquestSchema = new Schema({
    user: { type: String, require: true },
    conquest: { type: String, require: true }
});

module.exports = mongoose.model('UserConquest', UserConquestSchema);