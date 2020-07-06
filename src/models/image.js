const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String
    },
    time: { type : Date, default: Date.now }
});

imageSchema.plugin(uniqueValidator);

module.exports.schema = imageSchema