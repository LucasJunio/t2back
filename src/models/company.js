const mongoose = require('mongoose');
const { Schema } = mongoose;

const CompanySchema = new Schema({
    name: { 
        type: String,
		require: true,
		unique: true,
        lowercase: true
     },
    state_registration: { type: Number },
    cpf: { type: Number },
    cnpj: { type: Number },
    moderation: { type: Number, require: true },
    user: { type: String, require: true },
    adress: { type: String, require: true },
    segment: { type: String, require: true },
    // adress: [{
    //     postal_code: { type: Number, require: true, max: 1},
    //     public_place: { type: String, require: true, max: 1},
    //     city: { type: String, require: true, max: 1},
    //     complement: { type: String },
    //     country: { type: String, require: true, max: 1},
    //     state: { type: String, require: true, max: 1},
    //     number: { type: Number, require: true, max: 1},
    //     neighborhood: { type: String, require: true, max: 1},
    // }],
    // contact: [{
    //     name: { type: String, require: true, unique: true, max: 3 },
    //     email: { type: String, require: true, unique: true, max: 3 },
    //     telephone: { type: String, require: true, max: 3 },
    //     company: { type: String, require: true, max: 3 }        
    // }]
});

module.exports = mongoose.model('Company', CompanySchema);