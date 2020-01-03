const models = require('../models');

function index(req, res, next) {
    const { from, to, search } = req.query;
    let query = {};
    if (search) {
        query = { ...query, name: { $regex: search } };
    }
    if (to) {
        query = { ...query, difficultyLevel: { $lte: +to } };
    }
    if (from) {
        query = {
            ...query,
            difficultyLevel: { ...query.difficultyLevel, $gte: +from }
        };
    }
    models.cubeModel.find(query)
        .then(cubes => {
            res.render('index.hbs', { cubes, search, from, to });
        })
        .catch(next)
    // if in express.js this is set to true "defaultLayout: false", res.render will searh this path: /views/layouts/main.hbs
}

function details(req, res, next) {
    const id = req.params.id;
    models.cubeModel.findById(id).populate('accessories')
        .then(cube => {
            if (!cube) {
                res.redirect('/not-found');
                return;
            }
            res.render('details.hbs', { cube });
        })
        .catch(next)
}

function postCreate(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;

    models.cubeModel.create({ name, description, imageUrl, difficultyLevel })
        .then(insertedCube => {
            res.redirect('/');
        })
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function notFound(req, res) {
    res.render('404.hbs');
}

function about(req, res) {
    res.render('about.hbs');
}

function def(req, res) {
    res.render('about.hbs');
}

module.exports = {
    index,
    about,
    def,
    details,
    notFound,
    postCreate,
    getCreate,
};