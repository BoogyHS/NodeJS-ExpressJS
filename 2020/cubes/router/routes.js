// TODO: Require Controllers...

module.exports = (app) => {
    app.get('/', (req, res) => {
        console.log(req);
        // res.send(`${JSON.stringify(req)}`)
        res.render(`../views/layouts/main.hbs`);
    })
};