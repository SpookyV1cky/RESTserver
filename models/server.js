import express from 'express';
import 'dotenv/config'
import { userPath } from '../routes/user.js';
import { dbConnect } from '../database/config.db.js';
import { authPath } from '../routes/auth.js';


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
    
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
        
    }

    routes(){ // ------------ ROUTES ------------------
        
        this.app.use('/api/users', userPath);
        this.app.use('/api/auth', authPath);

    } // ----------- ROUTES --------------
    
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Listening on port: ${this.port}`);
        });
    }
}
export{
    Server
}
