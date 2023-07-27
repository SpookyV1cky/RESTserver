import { Router } from "express"; 
import { check } from "express-validator";

import { validate } from "../middlewares/validator.js";
import { upload } from "../controllers/uploads.js";


const uploadsPath = Router();

uploadsPath.post('/', upload);


export{
    uploadsPath
}