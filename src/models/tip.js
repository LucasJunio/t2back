const mongoose = require('mongoose');
const { Schema } = mongoose;
const Imagem = require('./image');

const TipSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        lowercase: true
        // Tornar insensitivo à acentuação
     },
    category: { type: String, require: true },
    description: { type: String, require: true },
    skill: { type: String, require: true },
    note: { type: String },
    image : [Imagem.schema]
});

module.exports = mongoose.model('Tip', TipSchema);