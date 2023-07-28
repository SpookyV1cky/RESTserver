const { Router } = require('express'); 
const { check } = require('express-validator');

const { validate } = require('../middlewares/validator');
const { upload } = require('../controllers/uploads');


const uploadsPath = Router();

uploadsPath.post('/', upload);


module.exports = {
    uploadsPath
}