import { Router } from "express"; 
import { userDelete, userGet, userPost, userPut } from "../controllers/user_controller.js";
import { check } from "express-validator";
import { validate } from "../middlewares/validator.js";
import { emailExist, idExist, isRoleValid } from "../helpers/db-validators.js";
import { validateJWT } from "../middlewares/jwt-validator.js";
import { roleCheck } from "../middlewares/role-validator.js";


const userPath = Router();


   
userPath.get('/', userGet);

userPath.post('/',[
    check('name', 'name is empty, your name is "empty"? asshole').not().isEmpty(),
    check('email').custom(emailExist).isEmail(),
    check('password', 'weak password, they will fuck you').isLength({min:8}),
    check('role').custom(isRoleValid),
    
    validate

] ,userPost);

userPath.put('/:id',[
    check('id', 'INVALID ID').isMongoId(),
    check('id').custom(idExist),
    check('role').custom(isRoleValid),
    validate]
    ,userPut);

userPath.delete('/:id',[
    validateJWT,
    check('id', 'INVALID ID').isMongoId(),
    check('id').custom(idExist),
    roleCheck('ADMIN_ROLE'),
    validate
] ,userDelete);

export{
    userPath
}