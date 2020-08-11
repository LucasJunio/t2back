const mongoose = require('mongoose');
const { Schema } = mongoose;

const SegmentSchema = new Schema({
    name: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
});

module.exports = mongoose.model('Segment', SegmentSchema);