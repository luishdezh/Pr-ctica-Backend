const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave']
}));

app.use(session({secret:'somesecrettokenhere'}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport');

app.use('/animals', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);


app.listen(3000, () => console.log('Listening on port 3000'));

module.exports = app;