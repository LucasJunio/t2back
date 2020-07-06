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

    const {name, category, segment} = req.body; 

    const ski = await Skill.findOne({name: name});

    if(ski) {
        res.json({status: 'Não é possível adicionar competência, pois há registro com o mesmo nome.'})
        return
    }

    const skill = new Skill({
        name, category, segment
    })
    await skill.save();
    res.json({status:'Competência salva!'});
})

// Updating of skill
router.put('/:id', async (req, res) => {

    res.json({status:'Competência atualizada!'});    
})

// Deleting of skill
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Competência excluída!'});
})

module.exports = router; 