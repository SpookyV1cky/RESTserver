import {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
// Controladores de respuesta para ruta /API/USERS


const userGet = async(req, res) =>{

    const {limit = 5, since = 0} = req.query;
    const query = {status:true};

    const [total, users] = await Promise.all([ //using Promise.all for performance
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

    //email exist
    
    //encrypt
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    //save
    
    await user.save();
    
    res.json({
        user
    });
}

const userPut = async(req, res) => {
    
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;
    if(password){
         //encrypt
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, resto);    
    res.json({
        msg:'update ok',
        id
    })
}

const userDelete = async(req, res) => {
    
    const {id} = req.params;


    // PERMANENTLY DELETE -
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