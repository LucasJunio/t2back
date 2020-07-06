const express = require('express');
const router = express.Router();
const Question = require('../models/question');

// General query of question
router.get('/', async (req, res) => {
	const question = await Question.find();
    res.json(question)
})

// Question query for ID
router.get('/:id', async (req, res)=> {
    const question = await Question.findById(req.params.id );
    res.json(question)
})

// Creating of question
router.post('/add', async (req, res) => {

    const {name, type, punctuation} = req.body; 

    const que = await Question.findOne({name: name});

    if(que) {
        res.json({status: 'Não é possível adicionar pergunta, pois há registro com o mesmo nome.'})
        return
    }

    const question = new Question({
        name, type, punctuation
    })
    await question.save();
    res.json({status:'Pergunta salva!'});
})

// Updating of question
router.put('/:id', async (req, res) => {

    res.json({status:'Pergunta atualizada!'});    
})

// Deleting of question
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Pergunta excluída!'});
})

module.exports = router; 