import mongoose from 'mongoose';
import {MONGODB_URI} from '@app/_config/const';
// declare global {
//   var mongoose: any // This must be a `var` and not a `let / const`
// }

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }
//     cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
//       return mongoose
//     })
//   }
//   try {
//     cached.conn = await cached.promise;
//     console.log('DB connected');
//   } catch (e) {
//     cached.promise = null
//     console.log(e)
//   }

//   return cached.conn
// }

let connected = false;

async function dbConnect () {
  mongoose.set('strictQuery', true);
  if(connected) {
      console.log('MongoDB is already connected');
      return;
    }
    try {
      await mongoose.connect(MONGODB_URI!, {
        dbName: "tradingdocs",
      })
  
      connected = true;
  
      console.log('MongoDB connected')
    } catch (error) {
      console.log(error);
    }

}

export default dbConnect