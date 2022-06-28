let Admins = require('../models/admins').Admins;
let express = require('express');
let router = express.Router();
let bcrypt=require('bcrypt');
let auth = require('../controllers/adminauth');

router.post('/login',async (req,resp)=>{
    let email =req.body.email;
    let password = req.body.password;
    let admin = await Admins.find().where({email: email});
    if(admin.length > 0){
        let comp=await bcrypt.compare(password,admin[0].password);
        if(comp){
            let token = auth.generateToken(admin[0]);
            resp.cookie('auth_token',token);
        resp.send({
            redirectURL: '/admin'
        });
        }
    
    else{
        resp.status(400);
        resp.send('Rejected');
    }
}
else{
    resp.status(400);
    resp.send('Rejected');
}

})
router.put('/update', async (req,resp)=>{
    let email =req.body.email;
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    let encryptednew = await bcrypt.hash(newpassword,12);
    let admin = await Admins.find().where({email: email});
    
        let comp=await bcrypt.compare(oldpassword,admin[0].password);
        if(comp){
            
            await Admins.updateOne({email: email}, {
                $set : {
                    password: encryptednew
                }
            })
            resp.send('Done!');
    }
    else
    {
        resp.send('Wrong Password or Mail');
    }
    


    
    
    
})



module.exports = router;