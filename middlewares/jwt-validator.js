const { response } = require ('express');
const jwt = require ('jsonwebtoken');
const { User } = require ('../models/userModel');


const validateJWT = async(req, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'invalid token / unauthorized'
        });
    }
    try {

        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        const userAuth = await User.findById(uid);

        req.userAuth = userAuth;

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'invalid token / unauthorized'
        });
    }

}


module.exports={
    validateJWT
}