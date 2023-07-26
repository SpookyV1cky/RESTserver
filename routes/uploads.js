import { Router } from "express"; 
import { check } from "express-validator";

import { validate } from "../middlewares/validator.js";
import { uploadFile } from "../controllers/uploads.js";


const uploadsPath = Router();

uploadsPath.post('/', uploadFile);


export{
    uploadsPath
}