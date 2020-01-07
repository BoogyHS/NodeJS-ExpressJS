const models = require('../models');
const utils = require('../utils');
const appConfig = require('../app-config');

function login(req, res) {
    res.render('login.hbs');
}

function loginPost(req, res, next) {
    const { username, password } = req.body;
    models.userModel.findOne({ username })
        .then(user => {
            return Promise.all([user, user.matchPassword(password)]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', { message: 'Wrong username or password' });
                return
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.isLogged = true;
            res.cookie(appConfig.authCookieName, token)
            res.redirect('/');
        })
        .catch(next);

}

function register(req, res) {
    res.render('register.hbs');

}

function registerPost(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register.hbs', { errors: { password: 'Password do not match' } });
        return;
    }
    // models.userModel.findOne({username})
    // .then(user=>{
    //     if(user){
    //         res.render('register.hbs', { errors: { username: 'Username is already registered' } });
    //     return;
    //     }

    return models.userModel.create({ username, password })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render('register.hbs', { errors: { username: 'Username is already registered' } });
                return;
            }
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookieName];
    models.tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(appConfig.authCookieName)
                .redirect('/');
        });
}

module.exports = {
    login,
    register,
    loginPost,
    registerPost,
    logout
}