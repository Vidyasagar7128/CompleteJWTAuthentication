const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema;
UserSchema = new Schema({
    name: String,
    email: String,
    mobile:Number,
    address:String,
    password:{
        type:String,
        select:false
    },
    cart:
    [
        {
        type: Schema.Types.ObjectId,
        ref:'cake'
        }
    ]
})

/////////////////Encrypt Password//////////////
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
/////////////////Generate Token//////////////
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({email:this.email},'mynameisanthonyghonsalvismainduniyameakelahun')
}
/////////////////Password Match//////////////
UserSchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}












module.exports = mongoose.model('user', UserSchema)

// {
//     "name":"Sonu Gaikwad",
//     "email":"vidyasagargaikwad@7781@gmail.com",
//     "mobile":8806416540,
//     "address":"Kranti Nagar Nideban Road Udgir",
//     "password":"Sonu@123"
    
// }

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpZHlhc2FnYXJnYWlrd2FkQDc3ODFAZ21haWwuY29tIiwiaWF0IjoxNjE2NjA5MzMyfQ.Zdg4mkBBe_IrrbhEalHhhlZ3Zx3FP8jgc03FUHQJhZA