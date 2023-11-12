require('dotenv').config();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  // כדי למנוע הצגת אזהרה
  mongoose.set('strictQuery', false);
  // וזה לווינדוס 11
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongo connect smart local");
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}