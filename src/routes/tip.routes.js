const express = require('express');
const router = express.Router();
const Tip = require('../models/tip');

// General query of tip
router.get('/', async (req, res) => {
	const tip = await Tip.find();
    res.json(tip)
})

// Tip query for ID
router.get('/:id', async (req, res)=> {
    const tip = await Tip.findById(req.params.id );
    res.json(tip)
})

// Creating of tip
router.post('/add', async (req, res) => {

    const {name, category, segment} = req.body; 

    const ti = await Tip.findOne({name: name});

    if(ti) {
        res.json({status: 'Não é possível adicionar dica, pois há registro com o mesmo nome.'})
        return
    }

    const tip = new Tip({
        name, category, segment
    })
    await tip.save();
    res.json({status:'Dica salva!'});
})

// Updating of tip
router.put('/:id', async (req, res) => {

    res.json({status:'Dica atualizada!'});    
})

// Deleting of tip
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Dica excluída!'});
})

module.exports = router; 