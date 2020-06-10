const { accessoryModel } = require('../models');

function getCreateAccessory(req, res) {
    res.render('createAccessory');
}

function postCreateAccessory(req, res) {
    const { name, description, image } = req.body;

    accessoryModel.create({ name, description, image })
        .then(createdAccessory => {
            console.log(createdAccessory);

            res.redirect('/');
        });
}

function getAttachAccessory(req, res) {
    res.render('attachAccessory');
}

module.exports = {
    getCreateAccessory,
    postCreateAccessory,
    getAttachAccessory
}