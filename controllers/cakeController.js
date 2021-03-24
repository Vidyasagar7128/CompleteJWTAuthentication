const Cake = require('../models/cake')
const Bake = require('../models/bekarey')


module.exports = {
    getCake: async (req, res, next) => {
        try {
            await Cake.find().then((data) => {
                res.status(200).json(data)
            })
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }
    },

    postCake: async (req, res, next) => {
        try {
            const newCake = new Cake(req.body)
            console.log('NewCake', newCake);
            //get user
            const bake = await Bake.findById({ _id: req.params.bakeId })
            newCake.bakery = bake
            //save car
            await newCake.save();
            //add car to user's collection
            bake.cakes.push(newCake)
            //save User
            await bake.save()
            res.status(200).json(newCake)
        } catch (e) {
            console.log(e)
            res.send('Internal Server Error')
        }
    },
}
// newCar = newCake
//user = bake
//cars = cakes