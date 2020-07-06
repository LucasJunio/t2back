const express = require('express');
const router = express.Router();
const Conquest = require('../models/conquest');

// General query of conquest
router.get('/', async (req, res) => {
	const conquest = await Conquest.find();
    res.json(conquest)
})

// Conquest query for ID
router.get('/:id', async (req, res)=> {
    const conquest = await Conquest.findById(req.params.id );
    res.json(conquest)
})

// Creating of conquest
router.post('/add', async (req, res) => {

    const {name, type, punctuation} = req.body; 

    const con = await Conquest.findOne({name: name});

    if(con) {
        res.json({status: 'Não é possível adicionar conquista, pois há registro com o mesmo nome.'})
        return
    }

    const conquest = new Conquest({
        name, type, punctuation
    })
    await conquest.save();
    res.json({status:'Conquista salva!'});
})

// Updating of conquest
router.put('/:id', async (req, res) => {

    res.json({status:'Conquista atualizada!'});    
})

// Deleting of conquest
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Conquista excluída!'});
})

module.exports = router; 