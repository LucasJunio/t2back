const express = require('express');
const router = express.Router();
const Interest = require('../models/interest');

// Creating of interest
router.post('/add', async (req, res) => {

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Interest.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Interest with the same name already exists'});
    } 


    const interest = new Interest({ name })
    await interest.save();

    res.status(201).send({status:'Saved interest'});
})


// Interest query for ID
router.get('/:id', async (req, res)=> {
    const interest = await Interest.findById(req.params._id );

    if(interest == null) {
        return res.status(400).send({error: 'Interest not found'});
    }

    res.status(200).send(interest);
})

// Updating of interest
router.put('/:id', async (req, res) => {

    const interest = await Interest.findById(req.params._id );

    if(interest == null) {
        return res.status(400).send({error: 'Interest not found'});
    }

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }       

    const validation = await Interest.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Interest with the same name already exists'});
    }

    const newInterest = { name };

    await Interest.findByIdAndUpdate(req.params.id, newInterest);    

    res.status(200).send({status:'Updated interest'});
})

// Deleting of interest
router.delete('/:id', async (req, res) => {

    const interest = await Interest.findById(req.params._id);

    if(interest == null) {
        return res.status(400).send({error: 'Interest not found'});
    }

    const userinterest = await UserInterest.findOne({ interest: req.params._id });

    if(userinterest !== null) {
        return res.status(400).send({error: 'You cannot delete a interest because there is a userinterest using it'});
    }

    await Interest.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted interest'});

})

module.exports = router; 