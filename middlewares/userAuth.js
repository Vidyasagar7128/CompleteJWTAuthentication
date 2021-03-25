const jwt = require('jsonwebtoken')
const User = require('../models/user')
exports.UserProtect = {
    userLoginforCake: async (req, res, next) => {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            //console.log(token);
            //this Token would store in Cookie or LocalStorage for Next time Login
        }
        if (!token) {
            console.log('empty');
        } else {
            try {
                const decodes = jwt.verify(token, 'mynameisanthonyghonsalvismainduniyameakelahun')
                console.log('Verified User Email ', decodes.email);
                    req.user = await User.findOne({ email: decodes.email })
                    console.log(req.user);
                    if(req.user == null){
                        next(new Error('User Does not Found with this details!'))
                    }else{
                    next()
                    }
                //next()

                
            } catch (e) {
                console.log('error');
            }

        }
    }
}