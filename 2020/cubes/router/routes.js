// TODO: Require Controllers...

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render(`home`);
    });
    app.get('/about', (req, res) => {
        res.render(`about`);
    });
    app.get('/create', (req, res) => {
        res.render(`create.hbs`);
    });
    app.get('/details/:id', (req, res) => {
        res.render(`details.hbs`);
    });
    app.get('*', (req, res) => {
        res.render(`404.hbs`);
    });
};