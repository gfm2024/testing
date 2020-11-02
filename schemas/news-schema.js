const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const newsSchema = mongoose.Schema({
_id: reqString, 
title: reqString,
description: reqString,
type: reqString,
date: reqString
})
module.exports = mongoose.model('news', newsSchema)