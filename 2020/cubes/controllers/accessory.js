const { accessoryModel, cubeModel } = require('../models');

function getCreateAccessory(req, res) {
    res.render('createAccessory');
}

function postCreateAccessory(req, res) {
    const { name, description, image } = req.body;

    accessoryModel
        .create({ name, description, image })
        .then(createdAccessory => { res.redirect('/'); });
}

function getAttachAccessory(req, res) {
    const { id: cubeId } = req.params;
    cubeModel
        .findById(cubeId)
        .then(cube => {
            return Promise.all([
                cube,
                accessoryModel.find({ cubes: { $nin: cubeId } })
            ])
        })
        .then(([cube, filterAccessories]) => {
            res.render('attachAccessory', {
                cube,
                accessories: filterAccessories.length > 0 ? filterAccessories : null
            });
        }).catch(console.log);
}

function postAttachAccessory(req, res) {
    const { id } = req.params;
    const { accessory: accessoryId } = req.body;
    Promise.all([
        cubeModel.updateOne({ _id: id }, { $push: { accessories: accessoryId } }),
        accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: id } })
    ])
        .then(() => {
            res.redirect('/')
        })
        .catch(next);
}

module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory,
    postAttachAccessory
}