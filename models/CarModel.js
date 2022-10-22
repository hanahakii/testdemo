const mongoose = require('mongoose')

var CarSchema = new mongoose.Schema({

    name: String,
    price: Number,
    quantity: Number,
    description: String,
    size: String,
    date: Date,
    image: String
}, {
 versionKey: false   
})
var CarModel = mongoose.model('Xe', CarSchema, 'car')
module.exports = CarModel