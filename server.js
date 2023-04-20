var express = require('express');
var path = require('path');
var dotenv = require('dotenv');
var session = require('express-session');
var bodyParser = require('body-parser');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
// configure the app to use bodyParser()

var indexRouter = require('./routes/indexRouter');
var personalRouter = require('./routes/personalRouter');
var recepcioComandaRouter = require('./routes/recepcioComandaRouter');
var llistaCategoriaRouter = require ('./routes/llistaCategoriaRouter');
var propostaPressupostRouter = require ('./routes/propostaPressupostRouter');
var fullComandaRouter = require ('./routes/fullComandaRouter');
var propostaNecessitatRouter = require ('./routes/propostaNecessitatRouter');
var activitatRouter = require('./routes/activitatRouter');
var llistatProveidorRouter = require('./routes/llistatProveidorRouter');
var elementRouter = require('./routes/elementRouter');
var authRouter = require('./routes/authRouter');
var loginRouter = require('./routes/loginRouter');
var devolucioRouter = require('./routes/devolucioRouter');

var app = express();

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

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
  secret: '1234', // una clave secreta para firmar la cookie de sesión
  resave: false, // no guarde la sesión si no ha cambiado
  saveUninitialized: true // guarde la sesión aunque todavía no se haya inicializado
}));

/*
app.get('/', function(req, res) {  
  res.render('home');  
});
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

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
app.use('/element',elementRouter);
app.use('/auth',authRouter)
app.use('/login',loginRouter);
app.use('/devolucio', devolucioRouter);

app.get('/borrar-sesion', (req, res) => {
  // Eliminar todas las variables de la sesión
  req.session.destroy();

  res.send('La sesión ha sido eliminada');
});



module.exports = app;
