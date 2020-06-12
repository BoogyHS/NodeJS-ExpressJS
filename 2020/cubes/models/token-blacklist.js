const mongoose = require('mongoose');

const tokenBlacklistShema = new mongoose.Schema({
    tocen: String,
});


module.exports = mongoose.model('TocenBlacklist', tokenBlacklistShema);