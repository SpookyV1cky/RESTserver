const express = require('express');
require('dotenv/config');
const { userPath } = require( '../routes/user');
const { dbConnect } = require( '../database/config.db');
const { authPath } = require( '../routes/auth');
const {uploadsPath} = require( '../routes/uploads');
const fileUpload = require('express-fileupload');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //paths
        this.paths = {
            user: '/api/users',
            auth: '/api/auth',
            uploads: '/api/uploads'
        }

    
        //DB CONNECT
        this.databaseConnect();
        this.middlewares();
        this.routes();
    }


    //DB CONNECTION
    async databaseConnect(){
        await dbConnect();
    }
    

    middlewares(){
        
        this.app.use( express.static('public'));
        this.app.use(express.json());
        this.app.use(fileUpload({
            createParentPath: true
        }));
        
    }

    routes(){ // ------------ RUTAS ------------------
        
        
        this.app.use(this.paths.auth, authPath);
        this.app.use(this.paths.uploads, uploadsPath);
        this.app.use(this.paths.user, userPath);


    } // ----------- RUTAS --------------
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listening on port: ${this.port}`);
        });
    }
}
module.exports = {
    Server
}
