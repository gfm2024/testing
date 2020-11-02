const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const playerSchema = mongoose.Schema({
_id: reqString,
name: reqString, 
team: reqString,
league: reqString,
nationality: reqString,
region: reqString,
height: reqString,
weight: reqString,
age: reqString,
foot: reqString,
condition: reqString,
position: reqString,
offensiveawareness: reqString,
ballcontrol: reqString,
dribbling: reqString,
tightposession: reqString,
lowpass: reqString,
loftedpass: reqString,
finishing: reqString,
heading: reqString,
placekicking: reqString,
curl: reqString,
speed: reqString,
acceleration: reqString,
kickingpower: reqString,
jump: reqString,
physicalcontact: reqString,
balance: reqString,
stamina: reqString,
defensiveawareness: reqString,
ballwinning: reqString,
aggression: reqString,
gkawareness: reqString,
gkcatching: reqString,
gkclearing: reqString,
gkreflexes: reqString,
weakfootusage: reqString,
weakfootaccuracy: reqString,
form: reqString,
injuryresistance: reqString,
overallrating: reqString,
playingstyle: reqString,
image: reqString,
inputName: reqString
})
module.exports = mongoose.model('players', playerSchema)