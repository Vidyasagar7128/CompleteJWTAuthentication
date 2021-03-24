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
    getCakes: async (req, res, next) => {
        try {
            await Cakes.find().then((data) => {
                res.status(200).json(data)
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }

    }
}