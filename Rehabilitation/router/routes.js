const { siteController } = require('../controllers');

module.exports = (app) => {
    app.get('/', siteController.home);
    app.get('/home', siteController.home);

    // app.get('/about', siteController.about);


    // app.get('*', (req, res) => {
    //     res.render(`404.hbs`);
    // });
};