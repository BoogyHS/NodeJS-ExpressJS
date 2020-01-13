const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
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
  difficultyLevel: {
    type: Number,
    required: true,
    
  },
  accessories:[{ type: mongoose.Types.ObjectId, ref: 'Accessories' }],
});

// cubeSchema.methods.getDescription = function () {
//   return this.description;
// };

module.exports = mongoose.model('Cube', cubeSchema);