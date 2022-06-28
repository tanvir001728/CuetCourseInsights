let uniqid = require('uniqid');
let material=require('../models/uploads').material;
let express = require('express');
let router = express.Router();







router.get('/', async (req,resp)=>{
    let materials = await material.find();
    resp.send(materials);
})
router.get('/:id', async (req,resp)=>{
    let id = req.params.id;

    let materials = await material.findOne({id: id});
    resp.send(materials);
})

router.post('/', async (req,resp)=>{
    let reqBody=req.body;
    let pdfPath=req.file.path;
    let newmaterial = new material({
        id:uniqid(),
        level: reqBody.level,
        term: reqBody.term,
        type: reqBody.type,
        sub: reqBody.sub,
       pdfpath: pdfPath.substring(11)
    })
    await newmaterial.save();
  
    resp.send('Created!'); 
    
})
router.delete('/:id', async(req,resp)=>{
    let id = req.params.id;
    await material.deleteOne({id: id});
    resp.send('Deleted!');
})

router.put('/:id', async (req,resp)=>{
    let id = req.params.id;
    await material.updateOne({id: id},req.body);
    resp.send('Updated!');
    
})

module.exports = router;