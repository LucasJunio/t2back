const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContentDepartmentSchema = new Schema({
    content: { type: String, require: true },
    department: { type: String, require: true }
});

module.exports = mongoose.model('ContentDepartment', ContentDepartmentSchema);