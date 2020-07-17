const express = require('express');
const router = express.Router();
const Skill = require('../models/skill');

// General query of skill
router.get('/', async (req, res) => {
	const skill = await Skill.find();
    res.json(skill)
})

// Skill query for ID
router.get('/:id', async (req, res)=> {
    const skill = await Skill.findById(req.params.id );
    res.json(skill)
})

// Creating of skill
router.post('/add', async (req, res) => {

    const {name, description} = req.body; 

    const ski = await Skill.findOne({name: name});

    if(ski) {
        return res.status(400).send({error: 'It is not possible to add competence, as there is a record with the same name.'});
    }

    const skill = new Skill({
        name, description
    })
    await skill.save();
    return res.status(200).send({succes: 'Registered skill'});
})

module.exports = router; 