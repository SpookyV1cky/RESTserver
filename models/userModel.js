const {Schema, model} = require('mongoose');


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'this is required']
    },
    email: {
        type: String,
        required: [true, 'this is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'this is required']
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
        default:'USER_ROLE'
    },
    status:{
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
    
});

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

const User = model('User', userSchema);


module.exports = {
    User
}