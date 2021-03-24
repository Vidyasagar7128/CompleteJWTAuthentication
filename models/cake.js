const mongoose = require('mongoose')
const Schema = mongoose.Schema;
CakeSchema = new Schema({
    name: String,
    type: String,
    price: Number,
    deliveryType: String,
    bakery:{
        type:String,
        ref:'bakery'
    }
    // Schema.Types.ObjectId
})
module.exports = mongoose.model('cake', CakeSchema)