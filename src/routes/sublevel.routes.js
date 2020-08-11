const express = require('express');
const router = express.Router();
const Sublevel = require('../models/sublevel');
const SublevelSkill = require('../models/sublevelskill');
const SkillUserSublevel = require('../models/skillusersublevel');


// Creating of sublevel
router.post('/add', async (req, res) => {

    const { name, quadrant } = req.body; 

    if(name == '' || quadrant == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Sublevel.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Conquest with the same name already exists'});
    } 

    const sublevel = new Sublevel({
        name, quadrant 
    })
    await sublevel.save();
    res.status(201).send({status:'Saved sublevel'});
})

// General query of sublevel
router.get('/', async (req, res) => {
    const sublevel = await Sublevel.find();

    if(sublevel == null) {
        return res.status(400).send({error: 'Sublevel not found'});
    }

    res.status(200).send(sublevel);
})

// Sublevel query for ID
router.get('/:id', async (req, res)=> {
    const sublevel = await Sublevel.findById(req.params.id );
    
    if(sublevel == null) {
        return res.status(400).send({error: 'Sublevel not found'});
    }

    res.status(200).send(sublevel);
})

// Updating of conquest
router.put('/:id', async (req, res) => {
    
    const sublevel = await Sublevel.findById(req.params.id );
    
    if(sublevel == null) {
        return res.status(400).send({error: 'Sublevel not found'});
    }

    const { name, quadrant } = req.body; 

    if(name == '' || quadrant == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Sublevel.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Conquest with the same name already exists'});
    } 

    const newSublevel = { name, type, punctuation };

    await Sublevel.findByIdAndUpdate(req.params.id, newSublevel);    

    res.status(200).send({status:'Sublevel conquest'});

})

// Deleting of conquest
router.delete('/:id', async (req, res) => {

    const sublevel = await Sublevel.findById(req.params.id );
    
    if(sublevel == null) {
        return res.status(400).send({error: 'Sublevel not found'});
    }


    const sublevelskill = await SublevelSkill.findOne({ conquest: req.params._id });

    if(sublevelskill !== null) {
        return res.status(400).send({error: 'You cannot delete a sublevel because there is a sublevelskill using it'});
    }
    
    const skillusersublevel = await SkillUserSublevel.findOne({ conquest: req.params._id });

    if(skillusersublevel !== null) {
        return res.status(400).send({error: 'You cannot delete a sublevel because there is a skillusersublevel using it'});
    }


    await Sublevel.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted conquest'});

})

module.exports = router; 