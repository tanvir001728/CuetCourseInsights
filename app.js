let express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
let multer =require('multer');
let nodemailer=require('nodemailer');
let app= express();
let mongoose=require('mongoose');
let cookieParser=require('cookie-parser');
let uploadrouter=require('./routes/materials');
let materialrequestrouter=require('./routes/material-request');
let joiningrequestrouter=require('./routes/joining-request');
let adminsRouter=require('./routes/admins');
let auth=require('./controllers/adminauth');


//user login part start

require('./config/passport')(passport);

app.use(express.static('public'));

app.set('view engine','ejs');



app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//user login part end



app.use(express.json());

let pdfstorage = multer.diskStorage({
    destination: (req,file,cb) => cb(null,'public/pdf'),
    filename: (req,file,cb) => cb(null,file.originalname)
})
app.use(multer({storage: pdfstorage}).single('pdfpath'));




mongoose.connect('mongodb://localhost/project');

app.use('/materials',uploadrouter);
app.use('/material-request',materialrequestrouter);
app.use('/joining-request',joiningrequestrouter);
app.use('/admins',adminsRouter);
app.use('/auth', require('./routes/auth'));
app.use('/mydash', require('./routes/dash'));
app.use(cookieParser());


app.get('/admin',(req,resp)=>{
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
    resp.render('admin'); }
    else 
    {
       resp.redirect('/adminlogin');
    }
})

app.get('/adminlogin',(req,resp)=>{
    resp.render('loginform');
})
app.listen(3000,()=>console.log('listening port 3000'));
