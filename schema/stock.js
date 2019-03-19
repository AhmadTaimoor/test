'use strict'
const { mongoose } = require('./Mongoose')
const StockSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        required: true
    },
    ProductPrice:
         {
             type: Number
         },
    ProductRange:
    {
        type: Number
    }

})
var Stock = mongoose.model('Stock', StockSchema)
module.exports = { Stock }
