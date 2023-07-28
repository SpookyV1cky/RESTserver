const { v4: uuid } = require('uuid');
// const { fileURLToPath } = require ('url');
const path = require ('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const uploadFile = (files , validExtension, location = '') => {
  
    return new Promise((resolve, reject) => {

    //get format
    let extension = files.name.split('.');
    extension = extension [extension.length - 1];

    // validate
    if(!validExtension.includes(extension)){
      return reject('Bad Request - Invalid Format');
    }
    // uid name
    files.name = uuid() + '.' + extension;

    //save
    
    const uploadPath = path.join(__dirname + `/../uploads/${location}/` + files.name);
      
    files.mv(uploadPath, (err) => {
      if (err)
        reject(err);
    });
    resolve( files.name );

    });

}

module.exports = {
    uploadFile
}