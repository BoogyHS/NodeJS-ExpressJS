const mongoose = require('mongoose');

const tokenBlacklistShema = new mongoose.Schema({
    tocken: String,
});


module.exports = mongoose.model('TockenBlacklist', tokenBlacklistShema);