const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const CompanyAudience = require('../models/companyaudience');
const Contact = require('../models/contact');
const CompanyType = require('../models/companytype');

// Creating of company
router.post('/add', async (req, res) => {

    const { name, state_registration, cpf, cnpj, moderation, user, adress, segment } = req.body; 

    console.log(req.body)

    if(name == '' || moderation == '' || user == '' || adress == '' || segment == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Company.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Company with the same name already exists'});
    } 

    const company = new Company({ name, state_registration, cpf, cnpj, moderation, user, adress, segment })
    await company.save();

    res.status(201).send({status:'Saved company'});
})
// router.post('/add', async (req, res) => {

//     const { name, adress} = req.body; 

//     // if(name == '' || moderation == '' || user == '' || adress == '' || segment == '') {
// 	// 	return res.status(400).send({ error: 'Some blank attribute'})
//     // }
    
//     // const validation = await Company.findOne({name: name});    

// 	// if(validation !== null) {
// 	// 	return res.status(400).send({error: 'Company with the same name already exists'});
//     // } 

//     const company = new Company({ name, adress: [{postal_code: adress.postal_code, public_place: adress.public_place}] })
//     await company.save();

//     res.status(201).send({status:'Saved company'});
// })


// Geral query company
router.get('/', async (req, res)=> {
    const company = await Company.find();

    if(company == null) {
        return res.status(400).send({error: 'Company not found'});
    }

    res.status(200).send(company);
})

// Company query for ID
router.get('/:id', async (req, res)=> {
    const company = await Company.findById(req.params.id );

    if(company == null) {
        return res.status(400).send({error: 'Company not found'});
    }

    res.status(200).send(company);
})

// Updating of company
router.put('/:id', async (req, res) => {

    const company = await Company.findById(req.params.id );

    if(company == null) {
        return res.status(400).send({error: 'Company not found'});
    }

    const { name, state_registration, cpf, cnpj, moderation, user, adress, segment } = req.body; 
    
    if(name == '' || moderation == '' || user == '' || adress == '' || segment == '') {
        return res.status(400).send({ error: 'Some blank attribute'})
    }   

    //  CORRIGIR ESSA VALIDAÇÃO PARA EVITAR DUPLICAÇÃO
    const validation = await Company.find({name: name});    

	if(validation.length > 1) {
		return res.status(400).send({error: 'Company with the same name already exists'});
    }

    const newCompany = { name, state_registration, cpf, cnpj, moderation, user, adress, segment };

    await Company.findByIdAndUpdate(req.params.id, newCompany);    

    res.status(200).send({status:'Updated company'});
})

// Deleting of company
router.delete('/:id', async (req, res) => {

    const company = await Company.findById(req.params.id);

    if(company == null) {
        return res.status(400).send({error: 'Company not found'});
    }

    const companyaudience = await CompanyAudience.findOne({ company: req.params.name });

    if(companyaudience !== null) {
        return res.status(400).send({error: 'You cannot delete a company because there is a companyaudience using it'});
    }
   
    const companytype = await CompanyType.findOne({ company: req.params.name });

    if(companytype !== null) {
        return res.status(400).send({error: 'You cannot delete a company because there is a companytype using it'});
    }

    await Company.findByIdAndDelete(req.params.id);
    return res.status(200).send({status:'Deleted company'});

})

module.exports = router; 