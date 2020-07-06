const express = require('express');
const router = express.Router();
const Content = require('../models/content');

// General query of content
router.get('/', async (req, res) => {
	const content = await Content.find();
    res.json(content)
})

// Content query for ID
router.get('/:id', async (req, res)=> {
    const content = await Content.findById(req.params.id );
    res.json(content)
})

// Creating of content
router.post('/add', async (req, res) => {

    const {title, category, description, competency, note, image} = req.body; 

    const con = await Content.findOne({title: title});

    if(con) {
        res.json({status: 'Não é possível adicionar conteúdo, pois há registro com o mesmo nome.'})
        return
    }

    const content = new Content({
        title, category, description, competency, note, image
    })
    await content.save();
    res.json({status:'Conteúdo salvo!'});
})

// Updating of content
router.put('/:id', async (req, res) => {

    res.json({status:'Conteúdo atualizada!'});    
})

// Deleting of content
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Conteúdo excluída!'});
})

module.exports = router; 