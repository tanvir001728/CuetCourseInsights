let uniqid = require('uniqid');
let materialrequest=require('../models/material-request').materialrequest;
let express = require('express');
let router = express.Router();


router.get('/',async(req, resp)=>{
    resp.send(await materialrequest.find());
});

router.post('/',async(req,resp)=>{
    let reqBody = req.body;
    let newmaterialrequest = new materialrequest({
        id: uniqid(),
        coursetitle: reqBody.coursetitle,
        details: reqBody.details
    })
    await newmaterialrequest.save()
    resp.send('Accepted!');
});

router.delete('/:id', async(req,resp)=>{
    await materialrequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;

