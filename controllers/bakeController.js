const Bake = require('../models/bekarey')

module.exports = {
    bakeIndex: async (req, res, next) => {


        try {
            await Bake.find().then((data) => {
                res.status(200).json(data)
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }
    },
    createBake: async (req, res, next) => {


        try {
            var data = new Bake(req.body)

            await data.save().then(() => {
                const token = data.getSignedJwtToken()
                console.log(token);
                res.status(200).json({ success: true, token })
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }

    },
    // LogIn Bakers
    login: async (req, res, next) => {
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
            const bake = await Bake.findOne({ email }).select('+password')
            if (!bake) {
                return next()
            }
            ////match 
            const isMatch = await bake.matchPassword(password)
            if (!isMatch) {
                return next()
            }
            const token = bake.getSignedJwtToken()
            console.log(token)
            res.status(200).json({ success: true, token,bake })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }
    },
    loginMe: async (req, res, next) => {
        req.bake = await Bake.findOne(req.bake)
        console.log('Login Me ==========',req.bake)
        res.status(200).json({ success: true, data: req.bake })
        next()
    }
}


// try{}catch (e) {
//     console.log('Internal Server Error')
//     res.send('Internal Server Error')
// }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdAZ21haWwiLCJpYXQiOjE2MTY1ODQ0MTV9.8J6VLtRuJLND0lxJ8xgBMwCkSDWWUganBUP_6an3kmI
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdAZ21haWwiLCJpYXQiOjE2MTY1ODQzMTJ9.KWeDtFP7YxoPW0LkAbc0m7ikaZ0cHZe6bdKQVEj2vp8