const {
    userModel,
    tokenBlacklistModel
} = require('../models');

const utils = require('../utils');
const { authCookieName } = require('../app-config');

function login(req, res) {
    res.render('login');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => {
            return Promise.all([user, user ? user.matchPassword(password) : false]);
        })
        .then(([user, match]) => {
            if (!match) {
                res.render('login', { message: 'Wrong username or password' });
                return
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.isLogged = true;
            res.cookie(authCookieName, token)
            res.redirect('/');
        })
        .catch(next);

}

function register(req, res) {
    res.render('register');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    if (password !== repeatPassword) {
        res.render('register', { errors: { password: 'Password do not match' } });
        return;
    }
    // userModel.findOne({ username })
    //     .then(user => {
    //         if (user) {
    //             res.render('register.hbs', { errors: { username: 'Username is already registered' } });
    //             return;
    //         }
    //     }
    return userModel.create({ username, password })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                res.render('register', { errors: { username: 'Username is already registered' } });
                return;
            }
            next(err);
        });
}

function logout(req, res) {
    const token = req.cookies[authCookieName];
    tokenBlacklistModel.create({ token })
        .then(() => {
            res.clearCookie(authCookieName)
                .redirect('/');
        });
}

module.exports = {
    login,
    register,
    postLogin,
    postRegister,
    logout
}