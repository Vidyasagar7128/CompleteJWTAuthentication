const express = require('express')
const router = express.Router()
const cakeController = require('./controllers/cakeController')
const bakeController = require('./controllers/bakeController')
const usersController = require('./controllers/usersController')
const {protect} = require('./middlewares/auth')
const multer = require('multer')
const upload = multer({dest: 'images/'})
const fileController = require('./controllers/fileController')

///Create Bakery & get
router.route('/bakery')
    .get(bakeController.bakeIndex)
    .post(bakeController.createBake)


router.route('/login')
    .post(bakeController.login)

//Post & Get cakes by Bakery with Id
router.route('/cake/:bakeId')
    .get(cakeController.getCake)
    .post(cakeController.postCake)

/// Normal Users can Show Cakes
router.route('/cakes')
    .get(usersController.getCakes)
    .post(usersController.createUser)

/// Create Users
router.route('/user')
    .post(usersController.createUser)


router.route('/find')
    .get(protect.login,bakeController.loginMe)


// router.route('/image')
//     .post(upload.single('file'),fileController.loginMe)

router.post('/image',upload.single('file'),(req,es) =>{
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true
        })
      }
})

    

module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4zQGdtYWlsLmNvbSIsImlhdCI6MTYxNjE2NzIyM30.68rE9vS7CDqLlpSMgLK1MrnLS0_O1L5EiMn-6XmK-gU