const mongoose = require('mongoose');
const { Schema } = mongoose;

const companyTypeSchema = new Schema({
    company: { type: String, require: true },
    contenttype: { type: String, require: true },

});

module.exports = mongoose.model('companyType', companyTypeSchema);