const express = require('express');
const router = express.Router();
const UserInterest = require('../models/userinterest');

// Creating of userinterest
router.post('/add', async (req, res) => {

    const { user, interest } = req.body; 

    if(user == '' || interest == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await UserInterest.findOne({user: user, interest: interest});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const userinterest = new UserInterest({
        user, interest
    })
    await userinterest.save();

    res.status(201).send({status:'Saved userinterest'});
})


// UserInterest query for ID
router.get('/:id', async (req, res)=> {
    const userinterest = await UserInterest.findById(req.params._id );

    if(userinterest == null) {
        return res.status(400).send({error: 'UserInterest not found'});
    }

    res.status(200).send(userinterest);
})

// Updating of userinterest
router.put('/:id', async (req, res) => {

    const userinterest = await UserInterest.findById(req.params._id );

    if(userinterest == null) {
        return res.status(400).send({error: 'UserInterest not found'});
    }

    const { user, interest } = req.body; 

    if(user == '' || interest == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await UserInterest.findOne({user: user, interest: interest});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 


    const newUserInterest = { user, interest };

    await UserInterest.findByIdAndUpdate(req.params.id, newUserInterest);    

    res.status(200).send({status:'Updated userinterest'});
})

// Deleting of userinterest
router.delete('/:id', async (req, res) => {

    const userinterest = await UserInterest.findById(req.params._id);

    if(userinterest == null) {
        return res.status(400).send({error: 'UserInterest not found'});
    }

    await UserInterest.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted userinterest'});

})

module.exports = router; 