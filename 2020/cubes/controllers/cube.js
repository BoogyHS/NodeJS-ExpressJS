const { cubeModel } = require('../models');

function home(req, res, next) {
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
    cubeModel.find(query)
        .then(cubes => {
            res.render('home', { cubes, search, from, to, user });
        })
        .catch(next)
}

function about(req, res) {
    res.render(`about`);
}

function getCreate(req, res) {
    res.render(`create`);
}

function postCreate(req, res) {

    const { name, description, imageUrl, difficultyLevel } = req.body;

    cubeModel.create({ name, description, imageUrl, difficultyLevel })
        .then(createdCube => {
            res.redirect('/');
        });
}

function getDetails(req, res, next) {
    const id = req.params.id;

    cubeModel.findById(id)
        .populate('accessories')
        .then(cube => {
            res.render(`details`, { cube });
        })
        .catch(next)
}

module.exports = {
    home,
    about,
    getCreate,
    postCreate,
    getDetails,
}