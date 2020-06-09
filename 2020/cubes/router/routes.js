const { cubeController } = require('../controllers')

module.exports = (app) => {
    app.get('/', cubeController.home);
    app.get('/home', cubeController.home);

    app.get('/about', cubeController.about);

    app.get('/create', cubeController.getCreate);
    app.post('/create', cubeController.postCreate);

    app.get('/details/:id', cubeController.getDetails);

    app.get('*', (req, res) => {
        res.render(`404.hbs`);
    });
};