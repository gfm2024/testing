const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqArray = {
    type: Array,
    required: true
}

const testSchema = mongoose.Schema({
_id: reqString, 
helpmessage: reqString,
guildprefs: reqArray,
mutedRole: reqString
})
module.exports = mongoose.model('guilds', testSchema)