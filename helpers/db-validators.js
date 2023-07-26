import { Role } from "../models/role.js";
import { User } from "../models/userModel.js";

// this module is an asshole's attendant module.
// basically its function is to avoid morons who make bad requests
// its an "atendedor de boludos"

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


export{
    isRoleValid,
    emailExist,
    idExist
}