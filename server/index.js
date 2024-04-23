const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/User.js')
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
 credentials: true,
 origin: 'http://localhost:5173',
}));

const connectDB = async () => {
 try{
  const conn = await mongoose.connect(process.env.MONGO_URL);
  console.log(`Mongo db connected: ${conn.connection.host}`)
  console.log('database successfully')
 }
 catch(error){
  console.log(error);
  process.exit(1);
 }
}
connectDB();
 
app.get('/test', (req, res) => {
 res.json('test ok');
});

/* send register data to mongo atlas */
app.post('/register', async(req, res) => {
 const { name, email, password } = req.body;
 const bcryptSalt = await bcrypt.genSalt(10);
 try{
  const checkEmail = User.findOne({ email: email })
  if(checkEmail){
   return res.status(400).json({ message: "Email already exists!"});
  }
  else{
   const userDoc = await User.create({
    name: name, 
    email: email, 
    password: await bcrypt.hash(password, bcryptSalt),
   });
   res.json(userDoc);
  }
 }
 catch(error){
  res.status(422).json(error);
 }
});

/* send login data to mongo Atlas */
app.post('/login', async(req, res) => {
 const { email, password } = req.body;
 const userDoc = await User.findOne({ email: email })
 if(userDoc){
  const passOk = bcrypt.compareSync(password, userDoc.password)
  if(passOk){
   jwt.sign(
    { email: userDoc.email, id: userDoc._id },
    process.env.SECRET_KEY,
    {
     expiresIn: 900000,
    },
    (error, token) => {
     if(error) throw error;
      res.cookie('token', token).json({ message: 'password OK' }) 
    }
   );
  }
  else{
   res.status(422).json('password is Incorrect!!!');
  } 
 }
 else{
  res.json('not found');
 }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;

  if(token){
    jwt.verify(token, process.env.SECRET_KEY, {}, async(error, userData) => {
      if(error) throw error;
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id });
    });
  }
  else{
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})

app.listen(4000);
