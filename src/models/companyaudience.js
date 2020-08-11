const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanyAudienceSchema = new Schema({
    company: { type: String, require: true },
    audience: { type: String, require: true }
});

module.exports = mongoose.model('CompanyAudience', CompanyAudienceSchema);