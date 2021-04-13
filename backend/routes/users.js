const multer = require('multer');
const upload = multer();

const { createToken, validateToken } = require('../utils/jwt');

const router = require('express').Router();
let User = require('../models/user.model');

// router.route('/register').post(upload.none(), (req, res) => {
//     const {username, password} = req.body;
//     const newUser = new User({username, password});

//     newUser.save()
//         .then(() => res.status(201).json('OK!'))
//         .catch(() => res.status(401).json('Error!'));
    
// });

router.route('/login').post(upload.none(), (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username})
        .then(user => {
            if(!user){
                res.json({auth: false, message: 'Wrong username or password!'})
            }else{
                if(password === user.password){
                    const accessToken = createToken(user);
                    
                    res.status(201).json({auth: true, token: accessToken, message: 'Authenticated!'})
                }else{
                    res.json({auth: false, message: 'Wrong username or password!'})
                }
            }
        }).catch(() => res.status(401).json("Error!"))
});


router.route('/login').get(validateToken, (req,res) => {
    res.status(200).json({auth: true, userID: req.username})
})

module.exports = router