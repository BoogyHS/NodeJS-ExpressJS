const { auth } = require('../utils');
const {
    cubeController,
    accessoryController,
    authController } = require('../controllers');

module.exports = (app) => {
    app.get('/', cubeController.home);
    app.get('/home', cubeController.home);

    app.get('/about', cubeController.about);

    app.get('/login', authController.login);
    app.post('/login', authController.postLogin);

    app.get('/register', authController.register);
    app.post('/register', authController.postRegister);

    app.get('/logout', authController.logout);

    app.get('/create', auth(), cubeController.getCreate);
    app.post('/create', auth(), cubeController.postCreate);

    app.get('/details/:id', cubeController.getDetails);

    app.get('/create/accessory', auth(), accessoryController.getCreateAccessory);
    app.post('/create/accessory', auth(), accessoryController.postCreateAccessory);

    app.get('/attach/accessory/:id', auth(), accessoryController.getAttachAccessory);
    app.post('/attach/accessory/:id', auth(), accessoryController.postAttachAccessory);

    app.get('*', (req, res) => {
        res.render(`404.hbs`);
    });
};