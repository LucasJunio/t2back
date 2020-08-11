const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const QuestionEvaluation = require('../models/questionevaluation');


// Creating of question
router.post('/add', async (req, res) => {
    
    const { name, description, skill } = req.body; 

    if(name == '' || description == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Question.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Question with the same name already exists'});
    } 

    const question = new Question({
        name, description, skill 
    })
    await question.save();
    res.status(201).send({status:'Saved question'});
})

// General query of question
router.get('/', async (req, res) => {
    const question = await Question.find();

    if(question == null) {
        return res.status(400).send({error: 'Question not found'});
    }

    res.status(200).send(question);
})

// Question query for ID
router.get('/:id', async (req, res)=> {
    const question = await Question.findById(req.params.id );
    
    if(question == null) {
        return res.status(400).send({error: 'Question not found'});
    }

    res.status(200).send(question);
})

// Updating of question
router.put('/:id', async (req, res) => {

    const question = await Question.findById(req.params.id );
    
    if(question == null) {
        return res.status(400).send({error: 'Question not found'});
    }

    const { name, description, skill } = req.body; 

    if(name == '' || description == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await Question.findOne({name: name});    

	if(validation !== null) {
		return res.status(400).send({error: 'Question with the same name already exists'});
    } 

    const newQuestion = { name, description, skill };

    await Question.findByIdAndUpdate(req.params.id, newQuestion);    

    res.status(200).send({status:'Updated question'});
})

// Deleting of question
router.delete('/:id', async (req, res) => {

    const question = await Question.findById(req.params.id );
    
    if(question == null) {
        return res.status(400).send({error: 'Question not found'});
    }

    const questionevaluation = await QuestionEvaluation.findOne({ question: req.params._id });

    if(questionevaluation !== null) {
        return res.status(400).send({error: 'You cannot delete a question because there is a questionevaluation using it'});
    }


    await Question.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted question'});
})

module.exports = router; 