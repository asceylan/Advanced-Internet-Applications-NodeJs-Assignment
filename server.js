require('./models/db');

const express = require('express');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var flash  = require('express-flash')
const path = require('path');
const bodyParser = require("body-parser");
const routes = require('./routes/web');

var app = express();
var sessionStore = new session.MemoryStore;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
app.use(flash());


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
  app.use(flash());
app.listen(3000, () => {
    console.log('Express server started at port: 3000');
});

app.use(function(req, res, next) {
    res.locals.session = req.session;
        
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});


app.use('/', routes);