const Bake = require('../models/bekarey')
//const { text } = require('express')
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
    getBakeryCakes: async (req, res, next) => {
        try {
            console.log('from Bake ', req.bake._id);
            await Bake.findById({ _id: req.bake._id }, { cakes: 1 }).populate('cakes').exec((err, data) => {
                if (!err) {
                    console.log('cake', data['cakes']);
                    res.status(200).json(data['cakes'])

                } else {
                    res.send('JWT is invalid')

                }

            })

        } catch (e) {
            console.log('Internal Server Error')
            res.send('Internal Server Error')
            next()
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
            res.status(200).json({ token })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }
    },
    loginMe: async (req, res, next) => {
        req.bake = await Bake.findOne(req.bake)
        console.log('Login Me ==========', req.bake)
        res.status(200).json([req.bake])
        //  only for Cakes  ========>  res.status(200).json({ success: true, data: req.bake['cakes'] })
        next()
    },
    getCakefordelete: async (req, res, next) => {
        const cakedata = req.params.cakeId;
        console.log(cakedata);
        const bakeWithCake = await Bake.findByIdAndUpdate({ _id: req.params.bakeId }, { $pull: { cakes: cakedata } }).exec((err, data) => {
            if (!err) {
                console.log('cake', data._id);
                res.status(200).json(data.cakes)
                var db = data.cakes;
                next()
            }
        })
    },
    findBakery: async (req, res, next) => {
        var text = new RegExp(req.params.text, 'i');
        var query = { $or: [{ name: { $regex: text, $options: 'i' } }] }
        await Bake.find(query).then((result) => {
            res.status(200).json(result)
        }).catch((err) => {
            console.log(err)
            console.log('failed')
            res.status(400).json(err)
        })
    }

}


// try{}catch (e) {
//     console.log('Internal Server Error')
//     res.send('Internal Server Error')
// }