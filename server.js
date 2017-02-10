require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const app = express();
// const socket = require('socket.io');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// CONFIG
require('./db/config');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}));
app.set('view engine', 'hbs');
// app.use(passport.initialize());
// app.use(passport.session());


// ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profiles', require('./routes/profile'));
app.use('/stories', require('./routes/story'));
app.use(require('./routes/error'));

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});




// FOR WEBSOCKET =========================================================
// const server = app.listen(3000);

// WEBSOCKET
// CALL SOCKET FUNCTION AND GIVE IT SERVER AS AN ARGUMENT
// const io = socket(server);
//
// io.sockets.on('connection', newConnection);
//
// function newConnection(socket) {
//   console.log('new connection : ' + socket.id);
//   // IF THERE IS A MESSAGE CALLED MOUSE TRIGGER THIS FUNCTION
//   socket.on('mouse', mouseMsg);
//
//   function mouseMsg(data) {
//     // WHEN THE MESSAGE COMES IN CALL FUNCTION BROADCAST.EMIT  TO SEND THE EXACT SAME MESSGE BACK OUT
//     socket.broadcast.emit('mouse', data);
//     // THIS WOULD GO TO ALL CONNECTIONS
//     // io.sockets.emit('mouse', data);
//     console.log(data);
//   }
// }
// END OF WEBSOCKET =========================================================
