const { cubeModel } = require('../models');

function home(req, res, next) {
    const { from, to, search } = req.query;
    const { user, isLogged } = req;

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
            res.render('home', { cubes, search, from, to, user, isLogged });
        })
        .catch(next)
}

function about(req, res, next) {
    const { user, isLogged } = req;

    res.render(`about`, { user, isLogged });
}

function getCreate(req, res) {
    const { user, isLogged } = req;
    res.render(`create`, { user, isLogged });
}

function postCreate(req, res) {

    const { name, description, imageUrl, difficultyLevel } = req.body;
    const { user } = req;

    cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id })
        .then(createdCube => {
            res.redirect('/');
        });
}

function getEdit(req, res) {
    const id = req.params.id;
    const { user, isLogged } = req;
    cubeModel.findOne({ _id: id, })
        .then(cube => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 },
            ]
            res.render('edit', { cube, options, user, isLogged });
        })
        .catch(console.error)
}

function postEdit(req, res) {
    const id = req.params.id;
    const { name, description, imageUrl, difficultyLevel } = req.body;
    const { user } = req;

    cubeModel.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel, creatorId: user._id })
        .then(updatedCube => {
            res.redirect('/');
        });
}

function getDetails(req, res, next) {
    const id = req.params.id;
    const { user, isLogged } = req;
    let isCreator = false;

    cubeModel.findById(id)
        .populate('accessories')
        .populate('creatorId')
        .then(cube => {
            if (cube.creatorId) {
                if (cube.creatorId._id.toString() === user._id.toString()) {
                    isCreator = true;
                }
            }
            res.render(`details`, { cube, isCreator, user, isLogged });
        })
        .catch(next)
}

function getDelete(req, res, next) {
    const id = req.params.id;
    const { user, isLogged } = req;
    //todo if cube don't exist
    cubeModel.findOne({ _id: id, creatorId: user._id })
        .then(cube => {
            const options = [
                { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
                { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
                { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
                { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
                { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
                { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 },
            ]
            res.render('delete', { cube, options, isLogged });
        })
        .catch(next)
}

function postDelete(req, res, next) {
    const id = req.params.id;
    const { user } = req;
    // models.cubeModel.findByIdAndDelete({ _id: id, creatorId: user._id })
    models.cubeModel.deleteOne({ _id: id, creatorId: user._id })
        .then(() => {
            res.redirect('/');
        })
}

module.exports = {
    home,
    about,
    getCreate,
    postCreate,
    getDetails,
    getEdit,
    postEdit,
    getDelete,
    postDelete
}