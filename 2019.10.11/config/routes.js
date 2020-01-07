const cubeController = require('../controllers/cube.js');
const accessoryController = require('../controllers/accessory.js');
const authController = require('../controllers/auth.js');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/logout', authController.logout);

    app.get('/login', authController.login)
        .post('/login', authController.loginPost);

    app.get('/register', authController.register)
        .post('/register', authController.registerPost);

    app.get('/create/accessory', auth(), accessoryController.createGet)
        .post('/create/accessory', auth(), accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet)
        .post('/attach/accessory/:id', accessoryController.attachPost);

    app.get('/about', cubeController.about);
    app.get('/details/:id', auth(false), cubeController.details);
    app.get('/not-found', cubeController.notFound);

    app.get('/create', auth(), cubeController.getCreate)
        .post('/create', auth(), cubeController.postCreate);

    app.get('/edit/:id', auth(), cubeController.getEdit)
        .post('/edit/:id', auth(), cubeController.postEdit);

    app.get('/delete/:id', auth(), cubeController.getDelete)
        .post('/delete/:id', auth(), cubeController.postDelete);

    app.get('/', auth(false), cubeController.index);

    app.use('/', cubeController.notFound);
};