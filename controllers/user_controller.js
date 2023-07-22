import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';

//Controllers for /api/users request

const userGet = async(req, res) =>{

    //
    const {limit = 5, since = 0} = req.query;
    const query = {status:true};

    //count and display users from database
    const [total, users] = await Promise.all([ 
        User.countDocuments(query),
        User.find(query)
            .skip(Number(since))
            .limit(Number (limit))
    ]);

    res.json({
        total,
        users
    });
}

const userPost = async(req, res) => {
    
    
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    
    //encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    
    await user.save();
    
    res.json({
        user
    });
}

const userPut = async(req, res) => {
    
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;
    
    //Password update
    if(password){
        //encrypt password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    // user general update
    const user = await User.findByIdAndUpdate(id, resto);    
    
    res.json({
        msg:'update ok',
        id
    })
}

const userDelete = async(req, res) => {
    
    const {id} = req.params;

    // use this instead for PERMANENTLY DELETE - avoid this for integrity of the database
    // const user = await User.findByIdAndDelete(id);
    
    const user = await User.findByIdAndUpdate(id, {status: false});
    const userAuth = req.userAuth;


    res.json({
        user,
        userAuth
    })
}


export{
    userGet,
    userPost,
    userPut,
    userDelete
}