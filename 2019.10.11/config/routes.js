const cubeController = require('../controllers/cube.js');
const accessoryController = require('../controllers/accessory.js');
const authController = require('../controllers/auth.js');

module.exports = (app) => {

    app.get('/login', authController.login)
        .post('/login', authController.loginPost);

    app.get('/register', authController.register)
        .post('/register', authController.registerPost);

    app.get('/create/accessory', accessoryController.createGet)
        .post('/create/accessory', accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet)
        .post('/attach/accessory/:id', accessoryController.attachPost);

    app.get('/about', cubeController.about);
    app.get('/details/:id', cubeController.details);
    app.get('/not-found', cubeController.notFound);

    app.get('/create', cubeController.getCreate)
        .post('/create', cubeController.postCreate);
    app.get('/', cubeController.index);

    app.use('/', cubeController.notFound);
};