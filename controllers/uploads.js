const {uploadFile} = require('../helpers/uploads');

const upload = async(req, res) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.FILES) {
      return res.status(400).send('No files were uploaded.');
    }
  
    
    try {
      
      const uploadname = await uploadFile(req.files.FILES, ['png','jpg','jpeg','gif'], 'img');
  
      res.json({
        msg: 'OK',
        name: uploadname
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({error});
    }

}


module.exports = {
    upload
}