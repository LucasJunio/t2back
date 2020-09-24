const express = require('express');
const router = express.Router();
const TargetAudience = require('../models/targetaudience');
const CompanyAudience = require('../models/companyaudience');

// Creating of targetaudience
router.post('/add', async (req, res) => {

    const { gender, starting_age, final_age, office } = req.body; 

    if(gender == '' || starting_age == '' || final_age == '' || office == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const targetaudience = new TargetAudience({
        gender, starting_age, final_age, office
    })
    
    await targetaudience.save();
    return res.status(201).send({status: 'Saved target audience'});
})

// General query of targetaudience
router.get('/', async (req, res) => {
    const targetaudience = await TargetAudience.find();
    
    if(targetaudience == null) {
        return res.status(400).send({error: 'None of the targetaudience found'});
    }

    return res.status(200).send(targetaudience);
})

// TargetAudience query for ID
router.get('/:id', async (req, res)=> {
    const targetaudience = await TargetAudience.findById(req.params.id );

    if(targetaudience == null) {
        return res.status(400).send({error: 'TargetAudience not found'});
    }

    return res.status(200).send(targetaudience);
})

// Updating of targetaudience
router.put('/:id', async (req, res) => {

    const targetaudience = await TargetAudience.findById(req.params.id );

    if(targetaudience == null) {
        return res.status(400).send({error: 'TargetAudience not found'});
    }    

    const { gender, starting_age, final_age, office } = req.body; 

    if(gender == '' || starting_age == '' || final_age == '' || office == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const newTargetAudience = { gender, starting_age, final_age, office };

    await TargetAudience.findByIdAndUpdate(req.params.id, newTargetAudience);    

    res.status(200).send({status:'Updated targetaudience'});
})

// Deleting of targetaudience
router.delete('/:id', async (req, res) => {

    const targetaudience = await TargetAudience.findById(req.params.id );

    if(targetaudience == null) {
        return res.status(400).send({error: 'TargetAudience not found'});
    }   

    const companyaudience = await CompanyAudience.findOne({ targetaudience: req.params.id });

    if(companyaudience !== null) {
        return res.status(400).send({error: 'It is not possible to delete targetaudience because there is a audiencecompany using it'});
    }

    await Office.findByIdAndDelete(req.params.id);
    return res.status(200).send({status:'Deleted targetaudience'});
})

module.exports = router; 