import mongoose from 'mongoose'  
const mongodbUri = process.env.MONGODB_URI  
const mongodbName = process.env.MONGODB_NAME  

export default async function connectDB(){  
  try{
    mongoose.connect(mongodbUri, {dbName:mongodbName})
    console.log('MongoDB Connected')
  }catch(err){
    console.log(err)
  }
}
