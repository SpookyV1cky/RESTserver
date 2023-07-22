import { Router } from "express"; 
import { userDelete, userGet, userPost, userPut } from "../controllers/user_controller.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validator.js";
import { emailExist, idExist, isRoleValid } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/jwt-validator.js";
import { roleCheck } from "../middlewares/role-validator.js";


const userPath = Router();


   
userPath.get('/', userGet); //get users

userPath.post('/',[ //Create a new user or login
    check('name', 'name is empty, your name is "empty"? asshole').not().isEmpty(),
    check('email').custom(emailExist).isEmail(),
    check('password', 'weak password, they will fuck you').isLength({min:8}),
    check('role').custom(isRoleValid),
    
    validate

] ,userPost);

userPath.put('/:id',[   //update a user
    check('id', 'INVALID ID').isMongoId(),
    check('id').custom(idExist),
    check('role').custom(isRoleValid),
    validate]
    ,userPut);

userPath.delete('/:id',[ //delete user
    validateJWT,
    check('id', 'INVALID ID').isMongoId(),
    check('id').custom(idExist),
    roleCheck('ADMIN_ROLE'),
    validate
] ,userDelete);

export{
    userPath
}