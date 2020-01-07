const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const secret = 'secret';

module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));
    // app.use(bodyParser.urlencoded({ extended: false })); //bodyParser е вече вграден в express
    app.use(cookieParser(secret));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        // defaultLayout: false //- if true, the engine searches in this path: /views/layouts/main.hbs
    }));
    app.set('views', path.resolve(__basedir, 'views'));
};