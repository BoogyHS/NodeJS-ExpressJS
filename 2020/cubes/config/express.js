const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const secret = 'pesho';

module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser(secret));
    
    app.engine('.hbs', handlebars({ extname: '.hbs' }));
    
    app.set('view engine', '.hbs');

    app.use(express.static(path.resolve(__basedir, 'static')));
};