const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');
const SkillUserSublevel = require('../models/skillusersublevel');
const Question = require('../models/question');
const OfficeSkill = require('../models/officeskill');
const ContentSkill = require('../models/contentskill');
const SublevelSkill = require('../models/sublevelskill');


// Creating of skill
router.post('/add', async (req, res) => {
    
    const { name, description } = req.body; 

    if(name == '' || description == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Skill.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Skill with the same name already exists'});
    } 

    const skill = new Skill({
        name, description
    })
    await skill.save();
    res.status(201).send({status:'Saved skill'});
})

// General query of skill
router.get('/', async (req, res) => {
    const skill = await Skill.find();

    if(skill == null) {
        return res.status(400).send({error: 'Skill not found'});
    }

    res.status(200).send(skill);
})


// Skill query for ID
router.get('/:id', async (req, res)=> {
    const skill = await Skill.findById(req.params.id );
    
    if(skill == null) {
        return res.status(400).send({error: 'Skill not found'});
    }

    res.status(200).send(skill);
})

// Updating of department
router.put('/:id', async (req, res) => {
    
    const skill = await Skill.findById(req.params.id );
    
    if(skill == null) {
        return res.status(400).send({error: 'Skill not found'});
    }

    const { name, description } = req.body; 

    if(name == '' || description == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Skill.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Skill with the same name already exists'});
    } 
    
    const newSkill = { name };

    await Skill.findByIdAndUpdate(req.params.id, newSkill);    

    res.status(200).send({status:'Updated skill'});

})


// Deleting of skill
router.delete('/:id', async (req, res) => {

    const skill = await Skill.findById(req.params.id );

    if(skill == null) {
        return res.status(400).send({error: 'Skill not found'});
    }
    
    const skillusersublevel = await SkillUserSublevel.findOne({ skill: req.params.id });

    if(skillusersublevel !== null) {
        return res.status(400).send({error: 'You cannot delete a skill because there is a skillusersublevel using it'});
    }

    const question = await Question.findOne({ skill: req.params.id });

    if(question !== null) {
        return res.status(400).send({error: 'You cannot delete a skill because there is a question using it'});
    }
    
    const officeskill = await OfficeSkill.findOne({ skill: req.params.id });

    if(officeskill !== null) {
        return res.status(400).send({error: 'You cannot delete a skill because there is a officeskill using it'});
    }    
    
    const contentskill = await ContentSkill.findOne({ skill: req.params.id });

    if(contentskill !== null) {
        return res.status(400).send({error: 'You cannot delete a skill because there is a contentskill using it'});
    }    
    
    const sublevelskill = await SublevelSkill.findOne({ skill: req.params.id });

    if(sublevelskill !== null) {
        return res.status(400).send({error: 'You cannot delete a skill because there is a sublevelskill using it'});
    }    

    await Skill.findByIdAndDelete(req.params.id);
    return res.status(200).send({status:'Deleted skill'});

})

module.exports = router; 