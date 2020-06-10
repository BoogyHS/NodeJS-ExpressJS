const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 1000
    },
    image: {
        type: String,
        required: true,
    },
    cubes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube'
    }]
});

module.exports = mongoose.model('Accessory', accessorySchema);