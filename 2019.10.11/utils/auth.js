const jwt = require('./jwt');
const appConfig = require('../app-config');
const models = require('../models');

function auth(req, res, next) {
    const token = req.cookies[appConfig.authCookieName] || '';
    jwt.verifyToken(token)
        .then(data => {
            models.userModel.findById(data.id)
                .then(user => {
                    req.user = user;
                    next();
                })
        })
        .catch(err => {
            if (err.message==='token expired') {
                console.error(err);
                res.redirect('login.hbs');
                return;
            }
            next(err);
        });
}


module.exports = {
    auth
}