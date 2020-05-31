const { v4 } = require('uuid');

class Cube {
    constructor(name, description, imageURL, difficultyLevel) {
        this.id = v4();
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.difficultyLevel = difficultyLevel;
    }
}

module.exports = Cube;