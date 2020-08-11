const express = require('express');
const router = express.Router();
const UserConquest = require('../models/userconquest');

// Creating of userconquest
router.post('/add', async (req, res) => {

    const { user, conquest } = req.body; 

    if(user == '' || conquest == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await UserConquest.findOne({user: user, conquest: conquest});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const userconquest = new UserConquest({
        user, conquest
    })
    await userconquest.save();
    res.status(201).send({status:'Saved userconquest'});
})

// General query of userconquest
router.get('/', async (req, res) => {
    const userconquest = await UserConquest.find();

    if(userconquest == null) {
        return res.status(400).send({error: 'UserConquest not found'});
    }

    res.status(200).send(userconquest);
})

// UserConquest query for ID
router.get('/:id', async (req, res)=> {
    const userconquest = await UserConquest.findById(req.params.id );
    
    if(userconquest == null) {
        return res.status(400).send({error: 'UserConquest not found'});
    }

    res.status(200).send(userconquest);
})

// Updating of userconquest
router.put('/:id', async (req, res) => {
    
    const userconquest = await UserConquest.findById(req.params._id );

    if(userconquest == null) {
        return res.status(400).send({error: 'UserConquest not found'});
    }

    const { user, conquest } = req.body; 

    if(user == '' || conquest == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await UserConquest.findOne({user: user, conquest: conquest});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newUserConquest = { user, conquest };

    await UserConquest.findByIdAndUpdate(req.params.id, newUserConquest);    

    res.status(200).send({status:'Updated userconquest'});

})

// Deleting of userconquest
router.delete('/:id', async (req, res) => {

    const userconquest = await UserConquest.findById(req.params._id );

    if(userconquest == null) {
        return res.status(400).send({error: 'UserConquest not found'});
    }

    await UserConquest.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted userconquest'});

})

module.exports = router; 