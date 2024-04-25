const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('./models/User.js');
const Place = require('./models/Place.js');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const Booking = require('./models/Booking.js');

const app = express();

app.use(express.json()); 
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
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

function getUserDataFromToken(req){
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, process.env.SECRET_KEY, {}, 
      async(error, userData) => {
        if(error) throw error;
        resolve(userData);
      }  
    );
  }); 
}
 
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
});

app.post('/upload-by-link', async(req, res) => {
  const { link } = req.body;
  const newName = Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname+'/uploads/' +newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' })
app.post('/upload', photosMiddleware.array('photos', 100), 
  (req, res) => {
    const uploadedFiles = [];
    for(let i=0; i < req.files.length; i++){
      const { path, originalname } = req.files[i];    
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      const newPath = path + '.' + ext;  
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads', ''));
    }
    res.json(uploadedFiles);
});
 
app.post('/places', (req, res) => {
  const {token} = req.cookies;  
  const { 
    title, address, addedPhotos, 
    description, perks, extraInfo,
    checkIn, checkOut, maxGuests, price } = req.body;
  jwt.verify(token, process.env.SECRET_KEY, {}, async(error, userData) => {
    if(error) throw error;
    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, photos:addedPhotos, 
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price
    })
    res.json(placeDoc);
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET_KEY, {}, async(error, userData) => {
    const { id } = userData;
    res.json( await Place.find({owner:id}))
  })
});

app.get('/places/:id', async(req, res) => {
  const { id } = req.params;
  res.json( await Place.findById(id) )
});

app.put('/places', async(req, res) => {
  const {token} = req.cookies;
  const {
    id, title, address, addedPhotos, description,
    perks, extraInfo, checkIn, checkOut, maxGuests, price
  } = req.body

  jwt.verify(token, process.env.SECRET_KEY, {}, async(error, userData) => {
   if(error) throw error;
   const placeDoc = await Place.findById(id);
   if(userData.id === placeDoc.owner.toString()){
    placeDoc.set({
      title, address, photos:addedPhotos, 
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price
    })
    await placeDoc.save();
    res.json('ok');
   }
  })
});

app.get('/places', async(req, res) => {
  res.json( await Place.find() );
});

app.post('/bookings', async(req, res) => {
  const userData = await getUserDataFromToken(req);
  const {
    place, checkIn, checkOut, 
    numberOfGuests, name, phone, price
  } = req.body;
  Booking.create({
    place, checkIn, checkOut, 
    numberOfGuests, name, phone, price,
    user: userData.id
  }).then((doc) => {
    res.json(doc);
  }).catch((error) => {
    throw error;
  })
});



app.get('/bookings', async(req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json( await Booking.find({ user: userData.id }).populate('place') );
});

app.listen(4000);
