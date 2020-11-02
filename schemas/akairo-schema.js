const mongoose = require('mongoose');
const reqString = {
    type: String,
    required: true
}
const reqObject = {
    type: Object,
    required: true
}
const guildSchema = mongoose.Schema({
    id: reqString,
    settings: reqObject
})

module.exports = mongoose.model('model', guildSchema);