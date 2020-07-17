const express = require('express');
const router = express.Router();
const Office = require('../models/office');

// General query of office
router.get('/', async (req, res) => {
	const office = await Office.find();
    res.json('offices')
})

// Office query for ID
router.get('/:id', async (req, res)=> {
    const office = await Office.findById(req.params.id );
    res.json(office)
})

// Creating of office
router.post('/add', async (req, res) => {

    const {name, sector} = req.body; 

    const off = await Office.findOne({name: name});

    if(off) {
        return res.status(400).send({error: 'It is not possible to add office, as there is a record with the same name.'});
    }

    const office = new Office({
        name, sector
    })
    await office.save();
    return res.status(200).send({succes: 'Registered office'});
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