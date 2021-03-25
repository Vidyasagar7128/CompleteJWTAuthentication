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


// {
//     "name":"cake 1",
//     "type":"normal",
//     "price":250,
//     "deliveryType":"Charge"
// }