const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// General query of category
router.get('/', async (req, res) => {
	const category = await Category.find();
    res.json(category)
})

// Category query for ID
router.get('/:id', async (req, res)=> {
    const category = await Category.findById(req.params.id );
    res.json(category)
})

// Creating of category
router.post('/add', async (req, res) => {

    const {name, segment} = req.body; 
    
    const cat = await Category.findOne({ name: name });

    if(cat) {
        res.json({status: 'Não é possível adicionar categoria, pois há registro com o mesmo nome.'})
        return
    }

    const category = new Category({
        name,
        segment
    })
    await category.save();
    res.json({status:'Categoria salva!'});
})

// Updating of category
router.put('/:id', async (req, res) => {

    res.json({status:'Categoria atualizada!'});    
})

// Deleting of category
router.delete('/:id', async (req, res) => {

    res.json({ status: 'Categoria excluída!'});
})

module.exports = router; 