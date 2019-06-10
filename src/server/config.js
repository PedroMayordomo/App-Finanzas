const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); //Mensajes entre vistas 
const passport = require('passport');
module.exports = app => {

    require('../config/passport');//passport
    // settings
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, '../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        helpers: require('./helpers'),
        extname: '.hbs'
    }));
    app.set('view engine', '.hbs');

    // middlewares
    app.use(express.urlencoded({ extended: false }));
    app.use(methodOverride('_method'));
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize()); //passport
    app.use(passport.session());//passport
    app.use(flash());


    // Global Variables
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });



    // routes
    app.use(require('../routes'));
    app.use(require('../routes/users'));
    app.use(require('../routes/notes'));
    app.use(require('../routes/finanzas'));


    // static files , importatnete para decir donde se encuentra el directorio de publica 
    app.use(express.static(path.join(__dirname, '../public')));
    return app;
};