const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/inventory', {
    useNewUrlParser: true
})

const Item = mongoose.model('item', new mongoose.Schema({
    name: {type: String},
    count: {type: Number},
    tags: {type: [String]},
    lastUpdateTime: {type: Date}
}))

module.exports = {Item}