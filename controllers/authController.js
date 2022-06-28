const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987gddyqufjygGDGGYGuyg";
const JWT_RESET_KEY = "jwtreset987gigugUGUYGIhihihiYIGIG";
const User = require('../models/User');
const { session } = require('passport');
exports.registerHandle = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email ID already registered' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {

                const oauth2Client = new OAuth2(
                    "634642279327-bmeq3idjicpokk8un4ls8jdujmkiok3c.apps.googleusercontent.com", // ClientID
                    "PV1p45gmhmXyIJlCYwGbayoj", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );

                oauth2Client.setCredentials({
                    refresh_token: "1//04f6jdCX-cOBlCgYIARAAGAQSNwF-L9IrYsDPzhh3zte86CzSw1RbBKRtZvFJJlVmTRRMgMKG14XGwec1N97ztgeGknpOHk48hTo"
                });
                const accessToken = oauth2Client.getAccessToken()

                const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;

                const output = `
                <h2>Please click on below link to activate your account</h2>
                <p>${CLIENT_URL}/auth/activate/${token}</p>
                <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                `;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        type: "OAuth2",
                        user: "u1704014@student.cuet.ac.bd",
                        clientId: "634642279327-bmeq3idjicpokk8un4ls8jdujmkiok3c.apps.googleusercontent.com",
                        clientSecret: "PV1p45gmhmXyIJlCYwGbayoj",
                        refreshToken: "1//04f6jdCX-cOBlCgYIARAAGAQSNwF-L9IrYsDPzhh3zte86CzSw1RbBKRtZvFJJlVmTRRMgMKG14XGwec1N97ztgeGknpOHk48hTo",
                        accessToken: accessToken
                    },
                });

                
                const mailOptions = {
                    from: '"CUET INSIGHTS" <u1704014@student.cuet.ac.bd>', 
                    to: email, 
                    subject: "Account Verification: CUET INSIGHTS ✔", 
                    generateTextFromHTML: true,
                    html: output,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        req.flash(
                            'error_msg',
                            'Something went wrong on our end. Please register again.'
                        );
                        res.redirect('/auth/login');
                    }
                    else {
                        console.log('Mail sent : %s', info.response);
                        req.flash(
                            'success_msg',
                            'Activation link sent to email ID. Please activate to log in.'
                        );
                        res.redirect('/auth/login');
                    }
                })

            }
        });
    }
}

exports.activateHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];
    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or expired link! Please register again.'
                );
                res.redirect('/auth/register');
            }
            else {
                const { name, email, password } = decodedToken;
                User.findOne({ email: email }).then(user => {
                    if (user) {
                
                        req.flash(
                            'error_msg',
                            'Email ID already registered! Please log in.'
                        );
                        res.redirect('/auth/login');
                    } else {
                        const newUser = new User({
                            name,
                            email,
                            password
                        });

                        bcryptjs.genSalt(10, (err, salt) => {
                            bcryptjs.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                newUser.password = hash;
                                newUser
                                    .save()
                                    .then(user => {
                                        req.flash(
                                            'success_msg',
                                            'Account activated. You can now log in.'
                                        );
                                        res.redirect('/auth/login');
                                    })
                                    .catch(err => console.log(err));
                            });
                        });
                    }
                });
            }

        })
    }
    else {
        console.log("Account activation error!")
    }
}

exports.forgotPassword = (req, res) => {
    const { email } = req.body;

    let errors = [];

    
    if (!email) {
        errors.push({ msg: 'Please enter an email ID' });
    }

    if (errors.length > 0) {
        res.render('forgot', {
            errors,
            email
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                
                errors.push({ msg: 'User with Email ID does not exist!' });
                res.render('forgot', {
                    errors,
                    email
                });
            } else {

                const oauth2Client = new OAuth2(
                    "634642279327-bmeq3idjicpokk8un4ls8jdujmkiok3c.apps.googleusercontent.com", // ClientID
                    "PV1p45gmhmXyIJlCYwGbayoj", // Client Secret
                    "https://developers.google.com/oauthplayground" // Redirect URL
                );

                oauth2Client.setCredentials({
                    refresh_token: "1//04f6jdCX-cOBlCgYIARAAGAQSNwF-L9IrYsDPzhh3zte86CzSw1RbBKRtZvFJJlVmTRRMgMKG14XGwec1N97ztgeGknpOHk48hTo"
                });
                const accessToken = oauth2Client.getAccessToken()

                const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, { expiresIn: '30m' });
                const CLIENT_URL = 'http://' + req.headers.host;
                const output = `
                <h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/auth/forgot/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;

                User.updateOne({ resetLink: token }, (err, success) => {
                    if (err) {
                        errors.push({ msg: 'Error resetting password!' });
                        res.render('forgot', {
                            errors,
                            email
                        });
                    }
                    else {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                type: "OAuth2",
                                user: "u1704014@student.cuet.ac.bd",
                                clientId: "634642279327-bmeq3idjicpokk8un4ls8jdujmkiok3c.apps.googleusercontent.com",
                                clientSecret: "PV1p45gmhmXyIJlCYwGbayoj",
                                refreshToken: "1//04f6jdCX-cOBlCgYIARAAGAQSNwF-L9IrYsDPzhh3zte86CzSw1RbBKRtZvFJJlVmTRRMgMKG14XGwec1N97ztgeGknpOHk48hTo",
                                accessToken: accessToken
                            },
                        });

                        
                        const mailOptions = {
                            from: '"CUET INSIGHTS" <u1704014@student.cuet.ac.bd>', 
                            to: email, 
                            subject: "Account Password Reset: CUET INSIGHTS ✔", 
                            html: output, 
                        };

                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.log(error);
                                req.flash(
                                    'error_msg',
                                    'Something went wrong on our end. Please try again later.'
                                );
                                res.redirect('/auth/forgot');
                            }
                            else {
                                console.log('Mail sent : %s', info.response);
                                req.flash(
                                    'success_msg',
                                    'Password reset link sent to email ID. Please follow the instructions.'
                                );
                                res.redirect('/auth/login');
                            }
                        })
                    }
                })

            }
        });
    }
}
exports.gotoReset = (req, res) => {
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                req.flash(
                    'error_msg',
                    'Incorrect or expired link! Please try again.'
                );
                res.redirect('/auth/login');
            }
            else {
                const { _id } = decodedToken;
                User.findById(_id, (err, user) => {
                    if (err) {
                        req.flash(
                            'error_msg',
                            'User with email ID does not exist! Please try again.'
                        );
                        res.redirect('/auth/login');
                    }
                    else {
                        res.redirect(`/auth/reset/${_id}`)
                    }
                })
            }
        })
    }
    else {
        console.log("Password reset error!")
    }
}


exports.resetPassword = (req, res) => {
    var { password, password2 } = req.body;
    const id = req.params.id;
    let errors = [];

    if (!password || !password2) {
        req.flash(
            'error_msg',
            'Please enter all fields.'
        );
        res.redirect(`/auth/reset/${id}`);
    }
    else if (password.length < 8) {
        req.flash(
            'error_msg',
            'Password must be at least 8 characters.'
        );
        res.redirect(`/auth/reset/${id}`);
    }
    else if (password != password2) {
        req.flash(
            'error_msg',
            'Passwords do not match.'
        );
        res.redirect(`/auth/reset/${id}`);
    }

    else {
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(password, salt, (err, hash) => {
                if (err) throw err;
                password = hash;

                User.findByIdAndUpdate(
                    { _id: id },
                    { password },
                    function (err, result) {
                        if (err) {
                            req.flash(
                                'error_msg',
                                'Error resetting password!'
                            );
                            res.redirect(`/auth/reset/${id}`);
                        } else {
                            req.flash(
                                'success_msg',
                                'Password reset successfully!'
                            );
                            res.redirect('/auth/login');
                        }
                    }
                );

            });
        });
    }
}
exports.loginHandle = (req, res, next) => {
    req.session.email = req.body.email;
    console.log(req.session.email);
    passport.authenticate('local', {
        successRedirect: '/mydash/show',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
}
exports.logoutHandle = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/auth/login');
}