import { uploadFile } from '../helpers/uploads.js';

const upload = async(req, res) => {

    //no funciona con 1 elemento - Object.keys(req.files.FILES).length cuenta cada elemento del objeto siendo 9
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.FILES) {
      return res.status(400).send('No files were uploaded.');
    }
  
    
    
    const uploadname = await uploadFile(req.files.FILES, ['png','jpg','jpeg','gif']);

    res.json({
      msg: 'OK',
      name: uploadname
    });

}


export{
    upload
}