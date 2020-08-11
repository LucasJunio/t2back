const express = require('express');
const router = express.Router();
const Adress = require('../models/adress');

// Creating of adress
router.post('/add', async (req, res) => {

    const { postal_code, public_place, city, complement, country, state, number, neighborhood } = req.body; 

    if(postal_code == '' || public_place == '' || city == '' || country == '' || state == '' || number == '' || neighborhood == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const adress = new Adress({
        postal_code, public_place, city, complement, country, state, number, neighborhood
    })
    await adress.save();

    res.status(201).send({status:'Saved adress'});
})


// Adress query for ID
router.get('/:id', async (req, res)=> {
    const adress = await Adress.findById(req.params._id );

    if(adress == null) {
        return res.status(400).send({error: 'Adress not found'});
    }

    res.status(200).send(adress);
})

// Updating of adress
router.put('/:id', async (req, res) => {

    const adress = await Adress.findById(req.params._id );

    if(adress == null) {
        return res.status(400).send({error: 'Adress not found'});
    }

    const { postal_code, public_place, city, complement, country, state, number, neighborhood } = req.body; 

    if(postal_code == '' || public_place == '' || city == '' || country == '' || state == '' || number == '' || neighborhood == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const newAdress = { postal_code, public_place, city, complement, country, state, number, neighborhood };

    await Adress.findByIdAndUpdate(req.params.id, newAdress);    

    res.status(200).send({status:'Updated adress'});
})

module.exports = router; 