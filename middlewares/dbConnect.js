'use strict';
import mongoose from "mongoose";

const connection = {}

async function dbConnection(){
  if (connection.isConnected){
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
  });
  if(db.connections[0].readyState === 1){
    console.log(`db connection successfully`)
  }
  
  connection.isConnected = db.connections[0].readyState;
}

export default dbConnection