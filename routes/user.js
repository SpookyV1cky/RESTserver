const { Router } = require ('express'); 
const { userDelete, userGet, userPost, userPut } = require ('../controllers/user_controller.js');
const { check } = require ('express-validator');
const { validate } = require ('../middlewares/validator');
const { emailExist, idExist, isRoleValid } = require ('../helpers/db-validators');
const { validateJWT } = require ('../middlewares/jwt-validator');
const { roleCheck } = require ('../middlewares/role-validator');


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

module.exports = {
    userPath
}