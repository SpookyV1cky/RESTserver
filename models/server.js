import express from 'express';
import 'dotenv/config'
import { userPath } from '../routes/user.js';
import { dbConnect } from '../database/config.db.js';
import { authPath } from '../routes/auth.js';
import { uploadsPath } from '../routes/uploads.js';
import fileUpload from "express-fileupload";

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
export{
    Server
}
