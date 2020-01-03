const models = require('../models');

function createPost(req, res, next) {
    const { name = null, description = null, imageUrl = null } = req.body;
    models.accessoriesModel.create({name, description, imageUrl})
        .then(created => {
            res.redirect('/')
        })
        .catch(next);
}

function createGet(req, res, next) {
    res.render('createAccessory.hbs');
}

function attachGet(req, res, next) {
    const { id: cubeId } = req.params;
    models.cubeModel.findById(cubeId).then(
      cube => Promise.all([cube, models.accessoriesModel.find({ cubes: { $nin: cubeId } })])
    ).then(([cube, filterAccessories]) => {
      res.render('attachAccessory.hbs', {
        cube,
        accessories: filterAccessories.length > 0 ? filterAccessories : null
      });
    }).catch(next);
  }

function attachPost(req, res, next) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        models.cubeModel.update({ _id: id }, { $push: { accessories: accessoryId } }),
        models.accessoriesModel.update({ _id: accessoryId }, { $push: { cubes: id } })
    ])
        .then(() => {
            res.redirect('/')
        })
        .catch(next);
}

module.exports = {
    createPost,
    createGet,
    attachGet,
    attachPost,
}