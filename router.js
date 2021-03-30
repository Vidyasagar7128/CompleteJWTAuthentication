const express = require('express')
const router = express.Router()
const cakeController = require('./controllers/cakeController')
const bakeController = require('./controllers/bakeController')
const usersController = require('./controllers/usersController')
const {protect} = require('./middlewares/auth')
const multer = require('multer')
const upload = multer({dest: 'images/'})
const fileController = require('./controllers/fileController')
const { UserProtect } = require('./middlewares/userAuth')

///Create Bakery & get
router.route('/bakery')
    .get(bakeController.bakeIndex)
    .post(bakeController.createBake)


router.route('/login')
    .post(bakeController.login)

//Post & Get cakes by Bakery with Id
router.route('/cake/:bakeId')
    .get(cakeController.getCake)
    .post(protect.login,cakeController.postCake)


///Cake Delete Update Bakery
router.route('/cake/:bakeId/:cakeId')
      .get(bakeController.getCakefordelete)

///Cake Delete
router.route('/cakedelete')
    .get(protect.login,cakeController.deleteCake)


/// Normal Users can Show Cakes
router.route('/cakes')
    .get(usersController.getCakes)
    .post(protect.login,usersController.createUser)//Commented

/// Create Users
router.route('/user')
    .post(usersController.createUser)


  router.route('/userlogin')
    .post(usersController.loginUser)


  router.route('/finduser')
    .get(UserProtect.userLoginforCake,usersController.logUser)


router.route('/find')
    .get(protect.login,bakeController.loginMe)


router.route('/search/:text')
    .get(bakeController.findBakery)


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

//   605b6c69a88301446818e785/605b734a2d132008a45e8a3f