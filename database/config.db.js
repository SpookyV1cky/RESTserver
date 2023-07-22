import mongoose from 'mongoose';

const dbConnect = async() => {

    //MONGODB CONNECT
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('DB_CONNECTION OK');

    } catch (error) {
        console.log(error);
        
    }
    
}

export{
    dbConnect
}