const express = require('express');
const router = express.Router();
const Office = require('../models/office');
const User = require('../models/user');
const OfficeSkill = require('../models/officeskill');
const TargetAudience = require('../models/targetaudience');

// Creating of office
router.post('/add', async (req, res) => {

    const {name, department} = req.body; 

    if(name == '' || department == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const validation = await Office.findOne({name: name});

    if(validation) {
        return res.status(400).send({error: 'It is not possible to add office, as there is a record with the same name'});
    }

    const office = new Office({
        name, department
    })
    
    await office.save();
    return res.status(201).send({status: 'Saved office'});
})

// General query of office
router.get('/', async (req, res) => {
    const office = await Office.find();
    
    if(office == null) {
        return res.status(400).send({error: 'None of the positions found'});
    }

    return res.status(200).send(office);
})

// Foreign query of office
router.get('/foreign', async (req, res) => {
    const office = await Office.find();

    if(office == null) {
        return res.status(400).send({error: 'Office not found'});
    }

    let foreign = []

    for(var i = 0; i < office.length ; i++){          
        foreign.push(office[i].name)
    }     

    res.status(200).send(foreign);
})


// Office query for ID
router.get('/:_id', async (req, res)=> {
    const office = await Office.findById(req.params._id );

    if(office == null) {
        return res.status(400).send({error: 'Office not found'});
    }

    res.status(200).send(office);
})

// Updating of office
router.put('/:_id', async (req, res) => {

    const office = await Office.findById(req.params._id );

    if(office == null) {
        return res.status(400).send({error: 'Office not found'});
    }    

    const { name, department } = req.body; 

    if(name == '' || department == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const validation = await Office.findOne({name: name});

    if(validation.length > 1) {
        return res.status(400).send({error: 'It is not possible to add office, as there is a record with the same name'});
    }

    const newOffice = { name, department };

    await Office.findByIdAndUpdate(req.params._id, newOffice);    

    res.status(200).send({status:'Updated office'});
})

// Deleting of office
router.delete('/:_id', async (req, res) => {

    const office = await Office.findById(req.params._id );

    if(office == null) {
        return res.status(400).send({error: 'Office not found'});
    }   

    const user = await User.findOne({ office: req.params._id });

    if(user !== null) {
        return res.status(400).send({error: 'It is not possible to delete office because there is a user using it'});
    }

    const officeskill = await OfficeSkill.findOne({ office: req.params._id });

    if(officeskill !== null) {
        return res.status(400).send({error: 'It is not possible to delete office because there is a officeskill using it'});
    }

    const targetaudience = await TargetAudience.findOne({ office: req.params._id });

    if(targetaudience !== null) {
        return res.status(400).send({error: 'It is not possible to delete office because there is a targetaudience using it'});
    }

    await Office.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted office'});
})

module.exports = router; 