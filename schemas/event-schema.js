const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const eventSchema = mongoose.Schema({
_id: reqString,
teamtype: reqString, 
eventtype: reqString,
period: reqString,
rewards: reqString
})
module.exports = mongoose.model('events', eventSchema)