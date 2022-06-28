const express = require('express');
let uniqid = require('uniqid');
const router = express.Router();
let yourpicks=require('../models/your-picks').yourpicks;
let issue=require('../models/issue').issue;
const { ensureAuthenticated } = require('../config/checkAuth')



router.get('/show', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

router.post('/yourpick',async(req,resp)=>{
    
    let reqBody = req.body;
    let newyourpicks = new yourpicks({
        mail:req.session.email,
        id: uniqid(),
        
        pdfpath: reqBody.pdfpath
        
    })
    await newyourpicks.save();
    resp.send('Accepted!');
    
    
    
    
});
router.get('/getpick',async(req, resp)=>{
    resp.send(await yourpicks.find({mail:req.session.email}));
});

router.delete('/:id', async(req,resp)=>{
    await yourpicks.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

router.post('/issue',async(req,resp)=>{
    let reqBody = req.body;
    let newissue = new issue({
        id: uniqid(),
        email: reqBody.email,
        details: reqBody.details
    })
    await newissue.save()
    resp.send('Accepted!');
});
router.get('/getissue',async(req, resp)=>{
    resp.send(await issue.find());
});

router.delete('/issueremove/:id', async(req,resp)=>{
    await issue.deleteOne({id: req.params.id});
    resp.send('Deleted');
});





module.exports = router;