const models = require('../models');

function index(req, res, next) {
    const { from, to, search } = req.query;
    const { user } = req;
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
            res.render('index.hbs', { cubes, search, from, to, user });
        })
        .catch(next)
    // if in express.js this is set to true "defaultLayout: false", res.render will searh this path: /views/layouts/main.hbs
}

function details(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    models.cubeModel.findById(id).populate('accessories')
        .then(cube => {
            if (!cube) {
                res.redirect('/not-found');
                return;
            }
            res.render('details.hbs', { cube, user });
        })
        .catch(next)
}

function postCreate(req, res) {
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const { user } = req;

    models.cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id })
        .then(insertedCube => {
            res.redirect('/');
        })
}

function getCreate(req, res) {
    res.render('create.hbs');
}

function postEdit(req, res) {
    const id = req.params.id;
    const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
    const { user } = req.user;

    models.cubeModel.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel, creatorId: user._id })
        .then(insertedCube => {
            res.redirect('/');
        })
}

function getEdit(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    //todo if cube don't exist
    models.cubeModel.findOne({ _id: id, creatorId: user._id })
        .then(cube => {
            res.render('editCube.hbs', { cube });
        })
        .catch(next)
}

function getDelete(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    //todo if cube don't exist
    models.cubeModel.findOne({ _id: id, creatorId: user._id })
        .then(cube => {
            res.render('deleteCube.hbs', { cube });
        })
        .catch(next)
}

function postDelete(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    models.cubeModel.findByIdAndDelete({ _id: id, creatorId: user._id })
        .then(() => {
            res.redirect('/');
        })
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
    postEdit,
    getEdit,
    getDelete,
    postDelete,
};