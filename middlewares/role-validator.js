const { response } = require('express');

const roleCheck = (...role) => {

    return (req, res = response, next) =>{

        if(!req.userAuth){
            return res.status(500).json({
                msg: 'error, user not validated'
            })
        }

        if(!role.includes(req.userAuth.role)){
            return res.status(401).json({
                msg: `se requiere permisos de ${role}`
            })
        }

        next();
    }
}

module.exports = {
    roleCheck
}