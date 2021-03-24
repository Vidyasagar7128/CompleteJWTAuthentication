const mongoose = require('mongoose')
const Schema = mongoose.Schema;
UserSchema = new Schema({
    name: String,
    email: String,
    mobile:Number,
    address:String,
    cart:
    [
        {
        type: Schema.Types.ObjectId,
        ref:'cake'
        }
    ]
})
module.exports = mongoose.model('user', UserSchema)

// {
//     "name":"Hanuman",
//     "location":"Udgir",
//     "address":"near shivaji chauk",
//     "deliveryType":"Delivery Boy"
// }