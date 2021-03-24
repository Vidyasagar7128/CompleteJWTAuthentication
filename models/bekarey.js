const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;
BekareySchema = new Schema({
    name: String,
    location: String,
    address:String,
    email:{
        type: String,
        required:[true,'Please enter Email'],
        unique:true,
        
    },
    mobile:{
        type:Number,
        required:[true,'Please enter Mobile'],
    },
    password:{
        type:String,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:String,
    createdAt:{
        type:Date,
        default:Date.now
    },
    cakes:
    [
        {
        type: Schema.Types.ObjectId,
        ref:'cake'
        }
    ]
})
/////////////////Encrypt Password//////////////
BekareySchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
///////////////// Sign Token JWt/////////////////
BekareySchema.methods.getSignedJwtToken = function(){
    return jwt.sign({email:this.email},'mynameisanthonyghonsalvismainduniyameakelahun')
}
BekareySchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}











module.exports = mongoose.model('bakery', BekareySchema)

// {
//     "name":"Hanuman Bekarey",
//     "location":"Udgir",
//     "address":"near shivaji chauk",
//     "deliveryType":"Delivery Boy",
//     "email":"hanumansweets@gmail.com",
//     "mobile":"9874562587",
//     "password":"Hanuman@123"
// }