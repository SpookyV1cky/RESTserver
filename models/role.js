const {Schema, model} = require('mongoose');

const roleSchema = new Schema({

    role:{
        type:String,
        required:[true,'role required']
    }

});


const Role = model('Role', roleSchema);

module.exports = {
    Role
}