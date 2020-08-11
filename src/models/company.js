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
    segment: { type: String, require: true }    
});

module.exports = mongoose.model('Company', CompanySchema);