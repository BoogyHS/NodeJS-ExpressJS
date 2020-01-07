const models = require('../models');

function login(req, res) {
    res.render('login.hbs');
}

function loginPost(req, res, next) {

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
            if (err.name=== 'MongoError' && err.code === 11000) {
                res.render('register.hbs', { errors: { username: 'Username is already registered' } });
                return;
            }
            next(err);
        });
}

module.exports = {
    login,
    register,
    loginPost,
    registerPost
}