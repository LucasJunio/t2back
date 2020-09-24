const express = require('express');
const router = express.Router();
const Content = require('../models/content');
const ContentAudienceUser = require('../models/contentaudienceuser');
const ContentDepartment = require('../models/contentdepartment');
const ContentSkill = require('../models/contentskill');

// Creating of content
router.post('/add', async (req, res) => {
    
    const { title, type, description, note, image, status } = req.body; 
    
    console.log("bodyy :"+req.body)

    if(title == '' || type == '' || description == '' || status == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const validation = await Content.findOne({title: title});

    if(validation) {
        return res.status(400).send({error: 'It is not possible to add content, as there is a record with the same name'});
    }
    
    const content = new Content({
        title, type, description, note, image, status
    })

    await content.save();
    res.json({status:'Saved content'});
})

// General query of content
router.get('/', async (req, res) => {
    const content = await Content.find();

    if(content == null) {
        return res.status(400).send({error: 'None of the content found'});
    }

    return res.status(200).send(content);
})

// Content query for ID
router.get('/:id', async (req, res)=> {
    const content = await Content.findById(req.params.id );

    if(content == null) {
        return res.status(400).send({error: 'None of the content found'});
    }

    return res.status(200).send(content);
})

// Updating of content
router.put('/:id', async (req, res) => {
    
    const content = await Content.findById(req.params.id );

    if(content == null) {
        return res.status(400).send({error: 'Content not found'});
    }

    const { title, type, description, note, image, status } = req.body; 
    
    if(title == '' || type == '' || description == '' || status == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
    }

    const validation = await Content.findOne({title: title});

    if(validation) {
        return res.status(400).send({error: 'It is not possible to add content, as there is a record with the same name'});
    }

    const newContent = { title, type, description, note, image, status };

    await Content.findByIdAndUpdate(req.params.id, newContent);    

    res.status(200).send({status:'Updated content'});

})

// Deleting of content
router.delete('/:id', async (req, res) => {

    const content = await Content.findById(req.params.id );

    if(content == null) {
        return res.status(400).send({error: 'Content not found'});
    }   

    const contentskill = await ContentSkill.findOne({ content: req.params.id });

    if(contentskill !== null) {
        return res.status(400).send({error: 'It is not possible to delete content because there is a contentskill using it'});
    }

    const contentdepartment = await ContentDepartment.findOne({ content: req.params.id });

    if(contentdepartment !== null) {
        return res.status(400).send({error: 'It is not possible to delete content because there is a contentdepartment using it'});
    }

    const contentaudienceuser = await ContentAudienceUser.findOne({ content: req.params.id });

    if(contentaudienceuser !== null) {
        return res.status(400).send({error: 'It is not possible to delete content because there is a contentaudienceuser using it'});
    }

    await Content.findByIdAndDelete(req.params.id);
    return res.status(200).send({status:'Deleted content'});
})

module.exports = router; 