const { siteController } = require('../controllers');

module.exports = (app) => {
    app.get('/', siteController.home);
    app.get('/home', siteController.home);

    app.get('/physio', siteController.getPhysio);
    app.get('/rehabilitation', siteController.getRehabilitation);
    app.get('/massage', siteController.getMassage);
    app.get('/hospis', siteController.getHospis);
    app.get('/payments', siteController.getPayments);
    app.get('/purpose', siteController.getPurpose);
    app.get('/tasks', siteController.getTasks);
    app.get('/resources', siteController.getResources);
    
    // app.get('/about', siteController.about);


    // app.get('*', (req, res) => {
    //     res.render(`404.hbs`);
    // });
};