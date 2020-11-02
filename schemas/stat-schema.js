const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqArray = {
    type: Array,
    required: true
}

const statSchema = mongoose.Schema({
_id: reqString,
information: reqArray
})
module.exports = mongoose.model('other', statSchema)