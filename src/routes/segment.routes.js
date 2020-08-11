const express = require('express');
const router = express.Router();
const Segment = require('../models/segment');
const Company = require('../models/company');

// Creating of segment
router.post('/add', async (req, res) => {

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Segment.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Segment with the same name already exists'});
    } 


    const segment = new Segment({ name })
    await segment.save();

    res.status(201).send({status:'Saved segment'});
})


// Segment query for ID
router.get('/:id', async (req, res)=> {
    const segment = await Segment.findById(req.params._id );

    if(segment == null) {
        return res.status(400).send({error: 'Segment not found'});
    }

    res.status(200).send(segment);
})

// Updating of segment
router.put('/:id', async (req, res) => {

    const segment = await Segment.findById(req.params._id );

    if(segment == null) {
        return res.status(400).send({error: 'Segment not found'});
    }

    const { name } = req.body; 

    if(name == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }       

    const validation = await Segment.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Segment with the same name already exists'});
    }

    const newSegment = { name };

    await Segment.findByIdAndUpdate(req.params.id, newSegment);    

    res.status(200).send({status:'Updated segment'});
})

// Deleting of segment
router.delete('/:id', async (req, res) => {

    const segment = await Segment.findById(req.params._id);

    if(segment == null) {
        return res.status(400).send({error: 'Segment not found'});
    }

    const company = await Company.findOne({ segment: req.params._id });

    if(company !== null) {
        return res.status(400).send({error: 'You cannot delete a segment because there is a company using it'});
    }

    await Segment.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted segment'});

})

module.exports = router; 