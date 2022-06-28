const express = require('express');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
var assert=require('assert');
const router = express.Router();
const authController = require('../controllers/authController');
const { response } = require('express');
router.get('/login', (req, res) => res.render('login'));
router.get('/forgot', (req, res) => res.render('forgot'));
router.get('/reset/:id', (req, res) => {
    res.render('reset', { id: req.params.id })
});
router.get('/update', (req, res) => res.render('update'));
router.get('/register', (req, res) => res.render('register'));
router.post('/register', authController.registerHandle);
router.get('/activate/:token', authController.activateHandle);
router.post('/forgot', authController.forgotPassword);
router.post('/reset/:id', authController.resetPassword);
router.get('/forgot/:token', authController.gotoReset);
router.post('/login', authController.loginHandle);
router.get('/logout', authController.logoutHandle);

router.post('/update',async function(req,res){
    if(req.session.email===req.body.email){

    var name=req.body.name;
    var password=req.body.password;
    let  newpassword;
  
  bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, async(err, hash) => {
          if (err) throw err;
           newpassword = hash;})  });
          await User.updateOne({email:req.body.email},{$set:{name:name}});
          await User.updateOne({email:req.body.email},{$set:{password:newpassword}});
         
          req.flash(
            'success_msg',
            'Success!');
            res.redirect('/auth/update'); 
            
      }

        else
        {
            req.flash(
                'error_msg',
                'Wrong email!'
            );
            res.redirect('/auth/update'); 
        }
          
     
      })






module.exports = router;