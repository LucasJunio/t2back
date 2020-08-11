const express = require('express');
const router = express.Router();
const Evaluation = require('../models/evaluation');
const AskEvaluation = require('../models/askevaluation');
const ResultProfile = require('../models/resultprofile');


// Creating of evaluation
router.post('/add', async (req, res) => {

    const { name, type, selfevaluation } = req.body; 

    if(name == '' || type == '' || selfevaluation == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Evaluation.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Evaluation with the same name already exists'});
    } 

    const evaluation = new Evaluation({
        name, type, selfevaluation
    })
    await evaluation.save();
    res.status(201).send({status:'Saved evaluation'});
})

// General query of evaluation
router.get('/', async (req, res) => {
    const evaluation = await Evaluation.find();

    if(evaluation == null) {
        return res.status(400).send({error: 'Evaluation not found'});
    }

    res.status(200).send(evaluation);
})

// Evaluation query for ID
router.get('/:id', async (req, res)=> {
    const evaluation = await Evaluation.findById(req.params.id );
    
    if(evaluation == null) {
        return res.status(400).send({error: 'Evaluation not found'});
    }

    res.status(200).send(evaluation);
})

// Updating of evaluation
router.put('/:id', async (req, res) => {
    
    const evaluation = await Evaluation.findById(req.params._id );

    if(evaluation == null) {
        return res.status(400).send({error: 'Evaluation not found'});
    }

    const { name, type, selfevaluation } = req.body; 

    if(name == '' || type == '' || selfevaluation == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Evaluation.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Evaluation with the same name already exists'});
    } 

    const newEvaluation = { name, type, selfevaluation };

    await Evaluation.findByIdAndUpdate(req.params.id, newEvaluation);    

    res.status(200).send({status:'Updated evaluation'});

})

// Deleting of evaluation
router.delete('/:id', async (req, res) => {

    const evaluation = await Evaluation.findById(req.params._id );

    if(evaluation == null) {
        return res.status(400).send({error: 'Evaluation not found'});
    }

    const askevaluation = await AskEvaluation.findOne({ evaluation: req.params._id });

    if(askevaluation !== null) {
        return res.status(400).send({error: 'You cannot delete a evaluation because there is a askevaluation using it'});
    }

    const resultprofile = await ResultProfile.findOne({ evaluation: req.params._id });

    if(resultprofile !== null) {
        return res.status(400).send({error: 'You cannot delete a evaluation because there is a resultprofile using it'});
    }

    await Evaluation.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted evaluation'});

})

module.exports = router; 