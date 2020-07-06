const express = require('express');
const router = express.Router();
const Office = require('../models/office');

// General query of office
router.get('/', async (req, res) => {
	const office = await Office.find();
    res.json(office)
})

// Office query for ID
router.get('/:id', async (req, res)=> {
    const office = await Office.findById(req.params.id );
    res.json(office)
})

// Creating of office
router.post('/add', async (req, res) => {

    const {name} = req.body; 

    const off = await Office.findOne({name: name});

    if(off) {
        res.json({status: 'Não é possível adicionar cargo, pois há registro com o mesmo nome.'})
        return
    }

    const office = new Office({
        name
    })
    await office.save();
    res.json({status:'Cargo salvo!'});
})

// Updating of office
router.put('/:id', async (req, res) => {

    res.json({status:'Cargo atualizado!'});    
})

// Deleting of office
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Cargo excluído!'});
})

module.exports = router; 