const { Role } = require('../models/role');
const { User } = require('../models/userModel');

const isRoleValid = async(role='')=>{
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error('invalid role');
    }
}

const emailExist = async(email)=>{
    const exist = await User.findOne({email});
    if(exist){
        throw new Error('email exist');
    }
}

const idExist = async( id )=>{
    const exist = await User.findById(id);
    if(!exist){
        throw new Error('id not found');
    }
}


module.exports = {
    isRoleValid,
    emailExist,
    idExist
}