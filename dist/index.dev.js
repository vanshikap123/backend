"use strict";

var express = require('express');

var app = express();
var port = process.env.port || 4000;

var connecttodb = require('./db');

var UserSchema = require('./models/UserSchema');

var userrouter = require('./routes/userroutes');

var postSchema = require('./models/postSchema');

var postRoutes = require('./routes/postRoutes');

var multer = require('multer');

var cloudinary = require('cloudinary').v2;

app.use(express.json({
  limit: '50mb'
}));
connecttodb();

var cors = require('cors');

app.use(cors());
app.set('view engine', 'ejs');
app.use('/user', userrouter);
app.use('/posts', postRoutes);
cloudinary.config({
  cloud_name: 'dmlnlyo8j',
  api_key: '114893969542199',
  api_secret: 'pB7UEHkNv25pRJxivihLETHFjiA'
});
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({
  storage: storage
});
app.post('/uploadvideo', upload.single('video'), function _callee(req, res) {
  var _req$body, title, author, content, result, post;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, author = _req$body.author, content = _req$body.content; // res.send(`File uploaded successfully: ${req.file.originalname}`)

          _context.next = 3;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(req.file.path, {
            resource_type: "video",
            folder: "uploads"
          }));

        case 3:
          result = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(postSchema.create({
            title: title,
            video: result.secure_url,
            author: author,
            content: content
          }));

        case 6:
          post = _context.sent;
          res.send({
            msg: "video saved successfully",
            post: post
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/uploadImage', upload.single('image'), function _callee2(req, res) {
  var _req$body2, title, author, content, result, post;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, title = _req$body2.title, author = _req$body2.author, content = _req$body2.content; // res.send(`File uploaded successfully: ${req.file.originalname}`)

          _context2.next = 3;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(req.file.path));

        case 3:
          result = _context2.sent;
          console.log(result); // res.send(result.secure_url)

          _context2.next = 7;
          return regeneratorRuntime.awrap(postSchema.create({
            title: title,
            image: result.secure_url,
            author: author,
            content: content
          }));

        case 7:
          post = _context2.sent;
          res.send({
            msg: "image saved successfully",
            post: post
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.listen(port, function () {
  console.log("Server is running on port ".concat(port));
});