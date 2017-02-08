require('dotenv').config();
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const session = require('express-session');
const hbs = require('express-handlebars');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const app = express();

// CONFIG
require('./db/config');
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/favicon.ico')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, 'views/layouts/')}));
app.set('view engine', 'hbs');

// ROUTES
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/stories', require('./routes/story'));
app.use(require('./routes/error'));
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
