const { User } = require ('../models/userModel');
const bcrypt = require ('bcryptjs');
const {genJWT } = require ('../helpers/JWT');
const {response } = require ('express');
const {googleVerify } = require ('../helpers/google-verify');


const login = async (req, res) =>{

    const {email, password} = req.body;
    
    // MAIL CHECK
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            msg: 'email doesnt exist'
        });
    }
    // IF A USER IS "DELETED" ITS STATUS MUST BE 'FALSE'
    if(!user.status){
        return res.status(400).json({
            msg: 'user doesnt exist'
        });
    }
    //PASS CHECK
    const validPass = bcrypt.compareSync(password, user.password);
    if(!validPass){
        return res.status(400).json({
            msg: 'wrong password'
        });
    }
    // JWT GEN
    const token = await genJWT(user.id);


    res.json({
        msg:'LOGIN OK',
        token
    })
}

const googleSignIn = async (req, res = response) =>{
    const {id_token} = req.body;

    try {
        
        const {name, picture, email} = await googleVerify(id_token);
        
        
        let user = await User.findOne({email});
        
        if(!user){
            const data = {
                name,
                email,
                password:'nopasss',
                picture,
                google: true
            };
            user = new User(data);
            await user.save();
        }
        if(!user.status){
            return res.status(401).json({
                msg: 'user unauthorized'
            });
        }

        const token = await genJWT(user.id);
        
        res.json({
            user,
            token
        });

    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    login,
    googleSignIn
}