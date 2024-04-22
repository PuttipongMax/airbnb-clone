const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require('./models/User.js')
require('dotenv').config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json()); 
app.use(cors({
 credentials: true,
 origin: 'http://localhost:5173',
}));

app.get('/test', (req, res) => {
 res.json('test ok');
});

app.post('/register', async(req, res) => {
 mongoose.connect(process.env.MONGO_URL);
 const { name, email, password } = req.body;
 try{
  const userDoc = await User.create({
  name: name, 
  email: email, 
  password: bcrypt.hashSync(password, bcryptSalt),
 });
 res.json(userDoc);
 }
 catch(error){
  res.status(422).json(error);
 }
 
});

app.listen(4000);
