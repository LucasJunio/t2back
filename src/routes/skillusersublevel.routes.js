const express = require('express');
const router = express.Router();
const SkillUserSublevel = require('../models/skillusersublevel');


// Creating of skillusersublevel
router.post('/add', async (req, res) => {
    
    const { skill, user, sublevel } = req.body; 

    if(skill == '' || user == '' || sublevel == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await SkillUserSublevel.findOne({skill: skill, user: user, sublevel: sublevel});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const skillusersublevel = new SkillUserSublevel({
        skill, user, sublevel
    })
    await skillusersublevel.save();
    res.status(201).send({status:'Saved skillusersublevel'});
})

// General query of skillusersublevel
router.get('/', async (req, res) => {
    const skillusersublevel = await SkillUserSublevel.find();

    if(skillusersublevel == null) {
        return res.status(400).send({error: 'SkillUserSublevel not found'});
    }

    res.status(200).send(skillusersublevel);
})

// SkillUserSublevel query for ID
router.get('/:id', async (req, res)=> {
    const skillusersublevel = await SkillUserSublevel.findById(req.params.id );
    
    if(skillusersublevel == null) {
        return res.status(400).send({error: 'SkillUserSublevel not found'});
    }

    res.status(200).send(skillusersublevel);
})

// Updating of skillusersublevel
router.put('/:id', async (req, res) => {

    const skillusersublevel = await SkillUserSublevel.findById(req.params.id );
    
    if(skillusersublevel == null) {
        return res.status(400).send({error: 'SkillUserSublevel not found'});
    }

    const { skill, user, sublevel } = req.body; 

    if(skill == '' || user == '' || sublevel == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await SkillUserSublevel.findOne({skill: skill, user: user, sublevel: sublevel});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newSkillUserSublevel = { skill, user, sublevel };

    await SkillUserSublevel.findByIdAndUpdate(req.params.id, newSkillUserSublevel);    

    res.status(200).send({status:'Updated skillusersublevel'});
})

// Deleting of skillusersublevel
router.delete('/:id', async (req, res) => {

    const skillusersublevel = await SkillUserSublevel.findById(req.params.id );
    
    if(skillusersublevel == null) {
        return res.status(400).send({error: 'SkillUserSublevel not found'});
    }

    await SkillUserSublevel.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted skillusersublevel'});
})

module.exports = router; 