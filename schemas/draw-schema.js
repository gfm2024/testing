const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}
const reqArray = {
    type: Array, 
    required: true
}
const drawSchema = mongoose.Schema({
_id: reqString,
information: reqArray,
title: reqString, 
cost: reqString,
bestplayers: reqString,
date: reqString,
type: reqString,
percentage: reqString
})
module.exports = mongoose.model('draws', drawSchema)