const Cake = require('../models/cake')
const User = require('../models/user')

module.exports = {
    createUser: async (req, res, next) => {


        try {
            var data = new User(req.body)

            await data.save().then((user) => {
                
                res.status(200).json({ success: true, user })
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }

    },
    loginUser: async(req,res,next)=>{





        try {
            const { email, password } = req.body
            /////validate email password
            if (!email || !password) {
                return next()
            }
            //new ErrorResponce('Enter Email And Password', 400)
            console.log(email)
            console.log(password)
            ///////check Baker
            const user = await User.findOne({ email }).select('+password')
            if (!user) {
                return next()
            }
            ////match 
            const isMatch = await user.matchPassword(password)
            if (!isMatch) {
                return next()
            }
            const token = user.getSignedJwtToken()
            console.log(token)
            res.status(200).json({ success: true, token,user })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }








    },
    getCakes: async (req, res, next) => {
        try {
            await Cake.find().then((data) => {
                res.status(200).json(data)
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }

    },
    logUser: async (req, res, next) => {
        req.user = await User.findOne(req.user)
        console.log('Login Me ==========',req.user)
        res.status(200).json({ success: true, data: req.user })
        next()
    }
}