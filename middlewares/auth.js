const jwt = require('jsonwebtoken')
const Bake = require('../models/bekarey')

exports.protect = {
    login: async (req, res, next) => {
            let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            //console.log(token);
            //this Token would store in Cookie or LocalStorage for Next time Login
        }
        
        if (!token) {
            console.log('empty');
        }else{
            try{
               const decodes = jwt.verify(token, 'mynameisanthonyghonsalvismainduniyameakelahun')
               console.log('Verified Email ',decodes.email);
               req.bake = await Bake.findOne({email:decodes.email})
               console.log('JwT Details',req.bake);
              next()
            }catch(e){
                console.log('error');
            }
              
        }
    }
    }
