import { Router } from "express"; 
import { googleSignIn, login } from "../controllers/auth_controller.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validator.js";



const authPath = Router();

//Simple Login
authPath.post('/login',[

    check('email').isEmail(),
    check('password', 'Empty password').not().isEmpty(),
    validate
],login);

//For login with google auth
authPath.post('/google',[

    check('id_token', 'google token missing').not().isEmpty(),
    
    validate
], googleSignIn);


export{
    authPath
}