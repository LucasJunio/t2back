const express = require('express');
const router = express.Router();
const ResultProfile = require('../models/resultprofile');


// Creating of resultprofile
router.post('/add', async (req, res) => {

    const { user, evaluation, result } = req.body; 

    if(user == '' || evaluation == '' || result == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ResultProfile.findOne({user: user, evaluation: evaluation, result: result});    

	if(validation !== null) {
		return res.status(400).send({error: 'ResultProfile with the same name already exists'});
    } 

    const resultprofile = new ResultProfile({
        user, evaluation, result
    })
    await resultprofile.save();
    res.status(201).send({status:'Saved resultprofile'});
})

// General query of resultprofile
router.get('/', async (req, res) => {

    const resultprofile = await ResultProfile.find();

    if(resultprofile == null) {
        return res.status(400).send({error: 'ResultProfile not found'});
    }

    res.status(200).send(resultprofile);
})

// ResultProfile query for ID
router.get('/:id', async (req, res)=> {
    const resultprofile = await ResultProfile.findById(req.params.id );
    
    if(resultprofile == null) {
        return res.status(400).send({error: 'ResultProfile not found'});
    }

    res.status(200).send(resultprofile);
})

// Updating of resultprofile
router.put('/:id', async (req, res) => {
    
    const resultprofile = await ResultProfile.findById(req.params._id );

    if(resultprofile == null) {
        return res.status(400).send({error: 'ResultProfile not found'});
    }

    const { user, evaluation, result } = req.body; 

    if(user == '' || evaluation == '' || result == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ResultProfile.findOne({user: user, evaluation: evaluation, result: result});    

	if(validation !== null) {
		return res.status(400).send({error: 'ResultProfile with the same name already exists'});
    } 

    const newConquest = { user, evaluation, result };

    await ResultProfile.findByIdAndUpdate(req.params.id, newConquest);    

    res.status(200).send({status:'Updated resultprofile'});

})

// Deleting of resultprofile
router.delete('/:id', async (req, res) => {

    const resultprofile = await ResultProfile.findById(req.params._id );

    if(resultprofile == null) {
        return res.status(400).send({error: 'ResultProfile not found'});
    }

    await ResultProfile.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted conquest'});

})

module.exports = router; 