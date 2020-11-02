const mongoose = require('mongoose')
const { mongoPath } = require('./config.json')
//const mongoPath = 'mongodb+srv://admin:123@cluster0.1395l.mongodb.net/PES?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose
}