const mongoose = require('mongoose');
const { Schema } = mongoose;

const DepartmentSchema = new Schema({
    name: { type: String, require: true, unique: true }
});

module.exports = mongoose.model('Department', DepartmentSchema);