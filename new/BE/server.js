var express = require('express'),
  app = express(),
  port = process.env.PORT || 3008,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  multer = require('multer')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/quiz_app',
{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
  console.log("Connected !!!")
}).catch(err => {
  console.log(err);
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) { //noi luu anh
    callback(null, 'media') // thu muc luu anh
  },
  filename: function (req, file, callback) { //dat ten anh
    callback(null, file.originalname )
  }
})

const upload = multer({ storage: storage }).any()
app.use(upload)
app.use(express.static('media'))

app.use(cors({}))
app.use(bodyParser.json());

var routes = require('./api/route/index');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Server started on: ' + port);
