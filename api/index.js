const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.set('strictQuery', true);

const app = express();
const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const path = require('path');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'An error occurred.';
  const data = err.data || [];

  res.status(status).json({ message: message, data: data })
});

mongoose.connect('mongodb+srv://gusvinandaellya:8vpA6agXZfiC3WKc@cluster0.2ix80br.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  app.listen(4000, () => {
    console.log('Server is running on port 4000');
  });
})
.catch((err) => {
  console.error(err);
});