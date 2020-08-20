const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    telephone: { type: String, require: true },
    company: { type: String, require: true }
});

module.exports = mongoose.model('Contact', ContactSchema);