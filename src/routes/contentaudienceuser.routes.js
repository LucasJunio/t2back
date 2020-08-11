const express = require('express');
const router = express.Router();
const ContentAudienceUser = require('../models/contentaudienceuser');

// Creating of contentaudienceuser
router.post('/add', async (req, res) => {

    const { content, audience, user } = req.body; 

    if(content == '' || audience == '' || user == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await ContentAudienceUser.findOne({content: content, audience: audience, user: user});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    } 

    const contentaudienceuser = new ContentAudienceUser({
        content, audience, user
    })
    await contentaudienceuser.save();

    res.status(201).send({status:'Saved contentaudienceuser'});
})


// ContentAudienceUser query for ID
router.get('/:id', async (req, res)=> {
    const contentaudienceuser = await ContentAudienceUser.findById(req.params._id );

    if(contentaudienceuser == null) {
        return res.status(400).send({error: 'ContentAudienceUser not found'});
    }

    res.status(200).send(contentaudienceuser);
})

// Updating of contentaudienceuser
router.put('/:id', async (req, res) => {

    const contentaudienceuser = await ContentAudienceUser.findById(req.params._id );

    if(contentaudienceuser == null) {
        return res.status(400).send({error: 'ContentAudienceUser not found'});
    }

    const { content, audience, user } = req.body; 

    if(content == '' || audience == '' || user == '') {
		return res.status(400).send({ error: 'Some blank attribute'})
	}

    const validation = await ContentAudienceUser.findOne({content: content, audience: audience, user: user});    

	if(validation !== null) {
		return res.status(400).send({error: 'There is already a relationship between these entities'});
    }     

    const newContentAudienceUser = { content, audience, user };

    await ContentAudienceUser.findByIdAndUpdate(req.params.id, newContentAudienceUser);    

    res.status(200).send({status:'Updated ContentAudienceUser'});
})

// Deleting of contentaudienceuser
router.delete('/:id', async (req, res) => {

    const contentaudienceuser = await ContentAudienceUser.findById(req.params._id);

    if(contentaudienceuser == null) {
        return res.status(400).send({error: 'ContentAudienceUser not found'});
    }

    await ContentAudienceUser.findByIdAndDelete(req.params._id);
    return res.status(200).send({status:'Deleted contentaudienceuser'});
})

module.exports = router; 