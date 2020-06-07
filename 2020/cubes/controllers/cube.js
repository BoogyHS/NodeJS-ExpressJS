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
            console.log(cubes);

            res.render('home.hbs', { cubes, search, from, to, user });
        })
        .catch(next)
}

function about(req, res) {
    res.render(`about`);
}

function getCreate(req, res) {
    res.render(`create.hbs`);
}

function getDetails(req, res) {
    const id = req.params.id;
    
    cubeModel.findById(id)
    // .populate('accessories')
    .then(cube=>{
        res.render(`details.hbs`, {cube});
    })
    .catch(e=>{
        console.log(e)
    })
}

module.exports = {
    home,
    about,
    getCreate,
    getDetails
}