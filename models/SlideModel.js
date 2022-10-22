const mongoose = require('mongoose')

var SlideSchema = new mongoose.Schema({

    name: String,
    price: Number,
    description: String,
    color: String,
    date: Date,
    image: String
}, {
 versionKey: false   
})
var SlideModel = mongoose.model('Cau Truot', SlideSchema, 'slide')
module.exports = SlideModel