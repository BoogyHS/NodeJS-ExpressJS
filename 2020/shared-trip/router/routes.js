const { auth } = require('../utils');
const {
    tripController,
    // accessoryController,
    authController } = require('../controllers');

module.exports = (app) => {
    app.get('/', auth(false), tripController.home);
    app.get('/home', auth(false), tripController.home);

    app.get('/about', auth(false), tripController.about);


    app.get('/login', authController.login);
    app.post('/login', authController.postLogin);

    app.get('/register', authController.register);
    app.post('/register', authController.postRegister);

    app.get('/logout', authController.logout);

    // app.get('/create', auth(), cubeController.getCreate);
    // app.post('/create', auth(), cubeController.postCreate);
   
    // app.get('/edit/:id', auth(), cubeController.getEdit);
    // app.post('/edit/:id', auth(), cubeController.postEdit);
    
    // app.get('/delete/:id', auth(), cubeController.getDelete);
    // app.post('/delete/:id', auth(), cubeController.postDelete);

    // app.get('/details/:id', auth(false), cubeController.getDetails);

    // app.get('/create/accessory', auth(), accessoryController.getCreateAccessory);
    // app.post('/create/accessory', auth(), accessoryController.postCreateAccessory);

    // app.get('/attach/accessory/:id', auth(), accessoryController.getAttachAccessory);
    // app.post('/attach/accessory/:id', auth(), accessoryController.postAttachAccessory);

    app.get('*', (req, res) => {
        res.render(`404.hbs`);
    });
};