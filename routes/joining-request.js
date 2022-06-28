let uniqid = require('uniqid');
let joiningrequest=require('../models/joining-request').joiningrequest;
let Admins = require('../models/admins').Admins;
let express = require('express');
let nodemailer=require('nodemailer');
let bcrypt= require('bcrypt');
let router = express.Router();


router.get('/', async(req, resp)=>{
    resp.send(await joiningrequest.find());
});

router.post('/',async(req,resp)=>{
    let reqBody = req.body;
    let newjoiningrequest = new joiningrequest({
        id: uniqid(),
        email: reqBody.email,
        
    })
    await newjoiningrequest.save();
    resp.send('Accepted!');
});
router.post('/mail', async (req,resp)=>{
    let reqBody = req.body;
    let passw = uniqid();
    
    let transporter= nodemailer.createTransport({
        service: 'hotmail',
        auth:{
            user: 'CuetCourseInsights@outlook.com',
            pass: 'cuetdawncrackers123'
        }
    })
    let mailOption ={
        from: 'CuetCourseInsights@outlook.com',
        to: reqBody.email,
        Subject: `Joining Request Confirmation`,
        text:`Your Mail: ${reqBody.email} 
        Your Password: ${passw}`
    }
    transporter.sendMail(mailOption,(error,info)=>{
        if(error){
            console.log(error);
            resp.send('error');
        } else{
            console.log('Email Sent');
            resp.send('success');
        }
    })
    let admin = await Admins.find().where({email:reqBody.email});
    if(admin.length===0)
    {
        let encryptedpass = await bcrypt.hash(passw,12);
        let newadmin= new Admins({
            email:reqBody.email,
            password:encryptedpass
        })
        await newadmin.save();
        resp.send('Done');
    }
    else
    {
        resp.send('Already exists');
    }

    
   
});

router.delete('/:id', async(req,resp)=>{
    await joiningrequest.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;

