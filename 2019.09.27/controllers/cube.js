const cubeModel = require('../models/cube.js');

function index(req, res, next) {
    const { from, to, search } = req.query;
    const findFn = item => {
        let result = true;
        if (search) {
            item.name.includes(search);
        }
        if (result && from) {
            result = +item.difficultyLevel >= +from;
        }
        if (result && to) {
            result = +item.difficultyLevel <= +to;
        }
        return result
    }
    cubeModel.find(findFn)
        .then(cubes => {
            res.render('index.hbs', { cubes, search, from, to });
        })
        .catch(next)
    // if in express.js this is set to true "defaultLayout: false", res.render will searh this path: /views/layouts/main.hbs
}

function details(req, res, next) {
    const id = +req.params.id;
    cubeModel.getOne(id)
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
    const { name = null, description = null, imgUrl = null, difficultyLevel = null } = req.body;
    const newCube = cubeModel.create(name, description, imgUrl, difficultyLevel);
    cubeModel.insert(newCube)
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