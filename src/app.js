const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const formularioRoutes = require('./routes/formulario_routes');

const app = express();
app.set('port', 8080);
app.set('views', __dirname + '/views');
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/partials', express.static(path.join(__dirname, 'views', 'partials')));

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'pf_web'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
});

app.use('/', formularioRoutes);

app.get('/', (req, res) => {
    res.redirect('/');
});
