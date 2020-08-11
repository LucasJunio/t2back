const express = require('express');
const router = express.Router();
const OfficeSkill = require('../models/officeskill');

// Creating of sublevelskill
router.post('/add', async (req, res) => {

    const { office, skill } = req.body; 

    if(office == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await OfficeSkill.findOne({office: office, skill: skill});   

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const officeskill = new OfficeSkill({
        office, skill
    })
    await officeskill.save();
    res.status(201).send({status:'Saved officeskill'});
})

// General query of officeskill
router.get('/', async (req, res) => {
    const officeskill = await OfficeSkill.find();

    if(officeskill == null) {
        return res.status(400).send({error: 'OfficeSkill not found'});
    }

    res.status(200).send(officeskill);
})

// OfficeSkill query for ID
router.get('/:id', async (req, res)=> {
    const officeskill = await OfficeSkill.findById(req.params.id );
    
    if(officeskill == null) {
        return res.status(400).send({error: 'SublevelSkill not found'});
    }

    res.status(200).send(officeskill);
})

// Updating of officeskill
router.put('/:id', async (req, res) => {
    
    const officeskill = await OfficeSkill.findById(req.params.id );
    
    if(officeskill == null) {
        return res.status(400).send({error: 'OfficeSkill not found'});
    }

    const { office, skill } = req.body; 

    if(office == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await OfficeSkill.findOne({office: office, skill: skill});   

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newOfficeSkill = { office, skill };

    await OfficeSkill.findByIdAndUpdate(req.params.id, newOfficeSkill);    

    res.status(200).send({status:'Updated officeskill'});

})

// Deleting of officeskill
router.delete('/:id', async (req, res) => {

    const officeskill = await OfficeSkill.findById(req.params.id );
    
    if(officeskill == null) {
        return res.status(400).send({error: 'OfficeSkill not found'});
    }

    await OfficeSkill.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted officeskill'});

})

module.exports = router; 