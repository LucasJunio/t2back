const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdressSchema = new Schema({
    postal_code: { type: Number, require: true },
    public_place: { type: String, require: true },
    city: { type: String, require: true },
    complement: { type: String },
    country: { type: String, require: true },
    state: { type: String, require: true },
    number: { type: Number, require: true },
    neighborhood: { type: String, require: true }
});

module.exports = mongoose.model('Adress', AdressSchema);