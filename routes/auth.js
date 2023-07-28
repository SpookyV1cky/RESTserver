const { Router } = require('express'); 
const { googleSignIn, login } = require('../controllers/auth_controller');
const { check } = require('express-validator');
const { validate } = require('../middlewares/validator');



const authPath = Router();

authPath.post('/login',[

    check('email').isEmail(),
    check('password', 'Empty password').not().isEmpty(),
    validate
],login);


authPath.post('/google',[

    check('id_token', 'google token missing').not().isEmpty(),
    
    validate
], googleSignIn);


module.exports = {
    authPath
}