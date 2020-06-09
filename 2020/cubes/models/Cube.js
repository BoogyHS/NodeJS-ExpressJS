const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        max: 1000
    },
    imageUrl: {
        type: String,
        required: true,
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    accessories: {
        type: mongoose.Types.ObjectId,
        ref: 'Accessories'
    }
});

module.exports = mongoose.model('Cube', cubeSchema);
