const express = require('express');
const router = express.Router();
const QuestionEvaluation = require('../models/questionevaluation');


// Creating of questionevaluation
router.post('/add', async (req, res) => {
    
    const { question, evaluation } = req.body; 

    if(question == '' || evaluation == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await QuestionEvaluation.findOne({question: question, evaluation: evaluation});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const questionevaluation = new QuestionEvaluation({
        question, evaluation
    })
    await questionevaluation.save();
    res.status(201).send({status:'Saved questionevaluation'});
})

// General query of questionevaluation
router.get('/', async (req, res) => {
    const questionevaluation = await QuestionEvaluation.find();

    if(questionevaluation == null) {
        return res.status(400).send({error: 'QuestionEvaluation not found'});
    }

    res.status(200).send(questionevaluation);
})

// QuestionEvaluation query for ID
router.get('/:id', async (req, res)=> {
    const questionevaluation = await QuestionEvaluation.findById(req.params.id );
    
    if(questionevaluation == null) {
        return res.status(400).send({error: 'Question not found'});
    }

    res.status(200).send(questionevaluation);
})

// Updating of questionevaluation
router.put('/:id', async (req, res) => {

    const questionevaluation = await QuestionEvaluation.findById(req.params.id );
    
    if(questionevaluation == null) {
        return res.status(400).send({error: 'QuestionEvaluation not found'});
    }

    const { question, evaluation } = req.body; 

    if(question == '' || evaluation == '' || skill == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await QuestionEvaluation.findOne({question: question, evaluation: evaluation});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newQuestionEvaluation = { question, evaluation };

    await QuestionEvaluation.findByIdAndUpdate(req.params.id, newQuestionEvaluation);    

    res.status(200).send({status:'Updated questionevaluation'});
})

// Deleting of questionevaluation
router.delete('/:id', async (req, res) => {

    const questionevaluation = await Question.findById(req.params.id );
    
    if(questionevaluation == null) {
        return res.status(400).send({error: 'QuestionEvaluation not found'});
    }

    await QuestionEvaluation.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted questionevaluation'});
})

module.exports = router; 