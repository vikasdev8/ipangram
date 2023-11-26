import mongoose from 'mongoose';
import {MONGODB_URI} from '@app/_config/const';

let connected = false;

async function dbConnect () {
  mongoose.set('strictQuery', true);
  if(connected) {
      console.log('MongoDB is already connected');
      return;
    }
    try {
      await mongoose.connect(MONGODB_URI!, {
        dbName: "interview",
      })
  
      connected = true;
  
      console.log('MongoDB connected')
    } catch (error) {
      console.log(error);
    }

}

export default dbConnect