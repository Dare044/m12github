var express = require('express');
var path = require('path');
var dotenv = require('dotenv');

var session = require('express-session');

var indexRouter = require('./routes/indexRouter');
var personalRouter = require('./routes/personalRouter');
var recepcioComandaRouter = require('./routes/recepcioComandaRouter');
var llistaCategoriaRouter = require ('./routes/llistaCategoriaRouter');
var propostaPressupostRouter = require ('./routes/propostaPressupostRouter');
var fullComandaRouter = require ('./routes/fullComandaRouter');
var propostaNecessitatRouter = require ('./routes/propostaNecessitatRouter');
var activitatRouter = require('./routes/activitatRouter');
var llistatProveidorRouter = require('./routes/llistatProveidorRouter');

var app = express();

dotenv.config();

const port = process.env.PORT || 8000;

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI;

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  name: 'M12',
  saveUninitialized: true,
  cookie: {masAge: 1000*60*60}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));



/*
app.get('/', function(req, res) {  
  res.render('home');  
});
*/



const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use('/', indexRouter);
app.use('/personal', personalRouter);
app.use('/recepcioComanda', recepcioComandaRouter);
app.use('/llistaCategoria', llistaCategoriaRouter);
app.use('/propostaPressupost', propostaPressupostRouter);
app.use('/fullComanda', fullComandaRouter);
app.use('/propostaNecessitat', propostaNecessitatRouter);
app.use('/activitat', activitatRouter);
app.use('/llistatProveidor', llistatProveidorRouter);


module.exports = app;
