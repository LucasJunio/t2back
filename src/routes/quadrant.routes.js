const express = require('express');
const router = express.Router();
const Quandrant = require('../models/quadrant');


// Creating of quadrant
router.post('/add', async (req, res) => {

    const { name} = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Quandrant.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Quandrant with the same name already exists'});
    } 

    const quadrant = new Quandrant({
        name
    })
    await quadrant.save();
    res.status(201).send({status:'Saved quadrant'});
})

// General query of quadrant
router.get('/', async (req, res) => {
    const quadrant = await Quandrant.find();

    if(quadrant == null) {
        return res.status(400).send({error: 'Quandrant not found'});
    }

    res.status(200).send(conquest);
})

// Conquest query for ID
router.get('/:id', async (req, res)=> {
    const quadrant = await Quandrant.findById(req.params.id );
    
    if(quadrant == null) {
        return res.status(400).send({error: 'Quandrant not found'});
    }

    res.status(200).send(conquest);
})

// Updating of conquest
router.put('/:id', async (req, res) => {
    
    const quadrant = await Quandrant.findById(req.params.id );
    
    if(quadrant == null) {
        return res.status(400).send({error: 'Quandrant not found'});
    }

    const { name} = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Quandrant.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Quandrant with the same name already exists'});
    } 

    const newQuandrant = { name };

    await Quandrant.findByIdAndUpdate(req.params.id, newQuandrant);    

    res.status(200).send({status:'Updated quadrant'});

})

// Deleting of quadrant
router.delete('/:id', async (req, res) => {

    const quadrant = await Quandrant.findById(req.params._id );

    if(quadrant == null) {
        return res.status(400).send({error: 'Quandrant not found'});
    }

    const sublevel = await UserQuandrant.findOne({ quadrant: req.params._id });

    if(sublevel !== null) {
        return res.status(400).send({error: 'You cannot delete a quadrant because there is a sublevel using it'});
    }


    await Quandrant.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted quadrant'});

})

module.exports = router; 