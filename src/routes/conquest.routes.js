const express = require('express');
const router = express.Router();
const Conquest = require('../models/conquest');


// Creating of conquest
router.post('/add', async (req, res) => {

    const { name, type, punctuation } = req.body; 

    if(name == '' || type == '' || punctuation == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Conquest.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Conquest with the same name already exists'});
    } 

    const conquest = new Conquest({
        name, type, punctuation
    })
    await conquest.save();
    res.status(201).send({status:'Saved Conquest'});
})

// General query of conquest
router.get('/', async (req, res) => {
    const conquest = await Conquest.find();

    if(conquest == null) {
        return res.status(400).send({error: 'Conquest not found'});
    }

    res.status(200).send(conquest);
})

// Conquest query for ID
router.get('/:id', async (req, res)=> {
    const conquest = await Conquest.findById(req.params.id );
    
    if(conquest == null) {
        return res.status(400).send({error: 'Conquest not found'});
    }

    res.status(200).send(conquest);
})

// Updating of conquest
router.put('/:id', async (req, res) => {
    
    const conquest = await Conquest.findById(req.params._id );

    if(conquest == null) {
        return res.status(400).send({error: 'Conquest not found'});
    }

    const { name, type, punctuation } = req.body; 

    if(name == '' || type == '' || punctuation == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Conquest.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Conquest with the same name already exists'});
    } 

    const newConquest = { name, type, punctuation };

    await Conquest.findByIdAndUpdate(req.params.id, newConquest);    

    res.status(200).send({status:'Updated conquest'});

})

// Deleting of conquest
router.delete('/:id', async (req, res) => {

    const conquest = await Conquest.findById(req.params._id );

    if(conquest == null) {
        return res.status(400).send({error: 'Conquest not found'});
    }

    const userconquest = await UserConquest.findOne({ conquest: req.params._id });

    if(userconquest !== null) {
        return res.status(400).send({error: 'You cannot delete a conquest because there is a userconquest using it'});
    }


    await Conquest.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted conquest'});

})

module.exports = router; 