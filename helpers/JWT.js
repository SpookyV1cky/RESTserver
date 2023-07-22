import jwt from "jsonwebtoken";

const genJWT = (uid = '') =>{
    
    return new Promise((resolve, reject)=>{

        const payload = {uid}; // user id must be save in jwt payload
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h' //Time until the jwt expires
        }, 
        (err, token) =>{
            if(err){
                console.log(err);
                reject('jwt error');
            }
            else{
                resolve(token);
            }
        });


    });

}

export{
    genJWT
}