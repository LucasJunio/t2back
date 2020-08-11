const express = require('express');
const router = express.Router();
const ContentDepartment = require('../models/contentdepartment');


// Creating of conquest
router.post('/add', async (req, res) => {

    const { content, department } = req.body; 

    if(content == '' || department == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ContentDepartment.findOne({content: content, department: department});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const contentdepartment = new ContentDepartment({
        content, department
    })
    
    await contentdepartment.save();
    res.status(201).send({status:'Saved contentdepartment'});
})

// General query of contentdepartment
router.get('/', async (req, res) => {
    const contentdepartment = await ContentDepartment.find();

    if(contentdepartment == null) {
        return res.status(400).send({error: 'ContentDepartment not found'});
    }

    res.status(200).send(contentdepartment);
})

// ContentDepartment query for ID
router.get('/:id', async (req, res)=> {
    const contentdepartment = await ContentDepartment.findById(req.params.id );
    
    if(contentdepartment == null) {
        return res.status(400).send({error: 'ContentDepartment not found'});
    }

    res.status(200).send(contentdepartment);
})

// Updating of contentdepartment
router.put('/:id', async (req, res) => {
    
    const contentdepartment = await ContentDepartment.findById(req.params._id );

    if(contentdepartment == null) {
        return res.status(400).send({error: 'ContentDepartment not found'});
    }

    const { content, department } = req.body; 

    if(content == '' || department == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }
    
    const validation = await ContentDepartment.findOne({content: content, department: department});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const newContentDepartment = { name, type, punctuation };

    await ContentDepartment.findByIdAndUpdate(req.params.id, newContentDepartment);    

    res.status(200).send({status:'Updated contentdepartment'});

})

// Deleting of contentdepartment
router.delete('/:id', async (req, res) => {

    const contentdepartment = await ContentDepartment.findById(req.params._id );

    if(contentdepartment == null) {
        return res.status(400).send({error: 'ContentDepartment not found'});
    }

    await ContentDepartment.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted contentdepartment'});

})

module.exports = router; 