import { request, response } from "express";
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadFile = (req, res) => {

    let uploadPath;
    let uploadFiles;

    //no funciona con 1 elemento - Object.keys(req.files.FILES).length cuenta cada elemento del objeto siendo 9
    
    if (!req.files || Object.keys(req.files).length === 0 || Object.keys(req.files.FILES).length > 5 || !req.files.FILES) {
      return res.status(400).send('No files were uploaded.');
    }
  
    uploadFiles = req.files.FILES;

    uploadFiles.forEach(file => {
        
        uploadPath = path.join(__dirname + '/../uploads/' + file.name);
      
        file.mv(uploadPath, (err) => {
          if (err)
            return res.status(500).send(err);
      
        });
    });
    
    res.send('File uploaded!');
}


export{
    uploadFile
}