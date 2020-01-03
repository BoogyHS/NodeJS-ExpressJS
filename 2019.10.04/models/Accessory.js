const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        // validate: {
        //   validator: function (v) {
        //     return v.length <= 1000;
        //   },
        //   message: props => `${props.value} must be maximum 1000 chars!`
        // },
    },
    imageUrl: {
        type: String,
        required: true,
        // validate: {
        //   validator: function (v) {
        //     return v.length <= 1000;
        //   },
        //   message: props => `${props.value} must be maximum 1000 chars!`
        // },
    },
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cube' }],

});

module.exports = mongoose.model('Accessories', accessoriesSchema);