const cubeController = require('../controllers/cube.js');
const accessoryController = require('../controllers/accessory.js')

module.exports = (app) => {
    app.get('/create/accessory', accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);

    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);

    app.get('/about', cubeController.about);
    app.get('/details/:id', cubeController.details);
    app.get('/not-found', cubeController.notFound);

    app.get('/create', cubeController.getCreate)
        .post('/create', cubeController.postCreate);
    app.get('/', cubeController.index);

    app.use('/', cubeController.notFound);
};