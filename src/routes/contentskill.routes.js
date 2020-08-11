const express = require('express');
const router = express.Router();
const ContentSkill = require('../models/contentskill');


// Creating of contentskill
router.post('/add', async (req, res) => {
    
    const { content, skill } = req.body; 

    if(skill == '' || content == '' ) {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ContentSkill.findOne({skill: skill, content: content });    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const contentskill = new ContentSkill({
        content, skill 
    })
    await contentskill.save();
    res.status(201).send({status:'Saved skillusersublevel'});
})

// General query of contentskill
router.get('/', async (req, res) => {
    const contentskill = await ContentSkill.find();

    if(contentskill == null) {
        return res.status(400).send({error: 'ContentSkill not found'});
    }

    res.status(200).send(contentskill);
})

// ContentSkill query for ID
router.get('/:id', async (req, res)=> {
    const contentskill = await ContentSkill.findById(req.params.id );
    
    if(contentskill == null) {
        return res.status(400).send({error: 'ContentSkill not found'});
    }

    res.status(200).send(contentskill);
})

// Updating of contentskill
router.put('/:id', async (req, res) => {

    const contentskill = await ContentSkill.findById(req.params.id );
    
    if(contentskill == null) {
        return res.status(400).send({error: 'ContentSkill not found'});
    }

    const { content, skill } = req.body; 

    if(skill == '' || content == '' ) {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ContentSkill.findOne({skill: skill, content: content });    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newContentSkill = { content, skill };

    await ContentSkill.findByIdAndUpdate(req.params.id, newContentSkill);    

    res.status(200).send({status:'Updated contentskill'});
})

// Deleting of skillusersublevel
router.delete('/:id', async (req, res) => {

    const contentskill = await ContentSkill.findById(req.params.id );
    
    if(contentskill == null) {
        return res.status(400).send({error: 'ContentSkill not found'});
    }

    await ContentSkill.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted skillusersublevel'});
})

module.exports = router; 