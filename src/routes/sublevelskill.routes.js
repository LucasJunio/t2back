const express = require('express');
const router = express.Router();
const SublevelSkill = require('../models/sublevelskill');

// Creating of sublevelskill
router.post('/add', async (req, res) => {

    const { sublevel, skill } = req.body; 

    if(sublevel == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await SublevelSkill.findOne({sublevel: sublevel, skill: skill});   

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const sublevelskill = new SublevelSkill({
        user, conquest
    })
    await sublevelskill.save();
    res.status(201).send({status:'Saved sublevelskill'});
})

// General query of sublevelskill
router.get('/', async (req, res) => {
    const sublevelskill = await SublevelSkill.find();

    if(sublevelskill == null) {
        return res.status(400).send({error: 'SublevelSkill not found'});
    }

    res.status(200).send(SublevelSkill);
})

// SublevelSkill query for ID
router.get('/:id', async (req, res)=> {
    const sublevelskill = await SublevelSkill.findById(req.params.id );
    
    if(sublevelskill == null) {
        return res.status(400).send({error: 'SublevelSkill not found'});
    }

    res.status(200).send(sublevelskill);
})

// Updating of sublevelskill
router.put('/:id', async (req, res) => {
    
    const sublevelskill = await SublevelSkill.findById(req.params.id );
    
    if(sublevelskill == null) {
        return res.status(400).send({error: 'SublevelSkill not found'});
    }

    const { sublevel, skill } = req.body; 

    if(sublevel == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await SublevelSkill.findOne({sublevel: sublevel, skill: skill});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newSublevelSkill = { sublevel, skill };

    await SublevelSkill.findByIdAndUpdate(req.params.id, newSublevelSkill);    

    res.status(200).send({status:'Updated sublevelskill'});

})

// Deleting of sublevelskill
router.delete('/:id', async (req, res) => {

    const sublevelskill = await SublevelSkill.findById(req.params.id );
    
    if(sublevelskill == null) {
        return res.status(400).send({error: 'SublevelSkill not found'});
    }

    await SublevelSkill.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted sublevelskill'});

})

module.exports = router; 