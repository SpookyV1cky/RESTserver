const mongoose = require('mongoose');

const dbConnect = async() => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DB_CONNECTION OK');

    } catch (error) {
        console.log(error);
        
    }
    
}

module.exports = {
    dbConnect
}