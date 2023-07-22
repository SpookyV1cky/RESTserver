import {Schema, model} from 'mongoose';

const roleSchema = new Schema({

    role:{
        type:String,
        required:[true,'role required']
    }

});


const Role = model('Role', roleSchema);

export{
    Role
}