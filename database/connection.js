const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@cluster0.ovnsr.mongodb.net/inventory?authSource=admin&replicaSet=atlas-qlrdyu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
    useNewUrlParser: true
})

const Item = mongoose.model('item', new mongoose.Schema({
    name: {type: String},
    count: {type: Number},
    tags: {type: [String]},
    lastUpdateTime: {type: Date}
}))

module.exports = {Item}