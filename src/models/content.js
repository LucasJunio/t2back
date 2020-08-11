const mongoose = require('mongoose');
const { Schema } = mongoose;
const Imagem = require('./image')

const ContentSchema = new Schema({
    title: { 
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
    },
    type: { type: Number, require: true },
    description: { type: String, require: true },
    note: { type: String },
    image: [Imagem.schema],
    status: { type: Number, require: true }
});

module.exports = mongoose.model('Content', ContentSchema);