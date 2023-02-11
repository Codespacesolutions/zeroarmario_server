require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')

exports.PORT = process.env.PORT;
exports.TOKEN_SECRET = process.env.TOKEN_SECRET
exports.PASSWORD_SECRET = process.env.PASSWORD_SECRET

exports.connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Database connected: ${con.connection.host}`);
  } catch (err) {
    console.log(`ERROR ${err.message}`);
    process.exit(1);
  }
};

exports.get_token = (id) =>{
  const token = jwt.sign({id: id}, process.env.TOKEN_SECRET, {expiresIn:"30d"})
  return token
}

exports.get_refresh_token = (id) =>{
  const refresh_token = jwt.sign({id: id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:"30d"})
  return refresh_token
}