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
    imageUrl: {
        type: String,
        required: true,
    },
    accessories: {
        type: Schema.Types.ObjectId,
        ref: 'Cube'
    }
});

module.exports = mongoose.model('Accessory', accessorySchema);