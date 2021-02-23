const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/animals', indexRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log('Listening on port 3000'));

module.exports = app;