const cubeController = require('../controllers/cube.js');

module.exports = (app) => {

    app.get('/about', cubeController.about);
    app.get('/details/:id', cubeController.details);
    app.get('/not-found', cubeController.notFound);

    app.get('/create', cubeController.getCreate)
        .post('/create', cubeController.postCreate);
    app.get('/', cubeController.index);
    
    app.use('/', cubeController.notFound);
};