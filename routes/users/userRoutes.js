const express = require('express');
const { userRegisterCtrl, userLoginCtrl, userUpdateCtrl, userDeleteCtrl, userGetAllCtrl, userGetProfile, userUpdateCtrlPro } = require('../../controllers/users/userCtrl');

const userRouter = express.Router();




userRouter.post('/update',userUpdateCtrlPro)
userRouter.get('/',userGetAllCtrl);


userRouter.delete('/:id',userDeleteCtrl);




userRouter.put('/:id',userUpdateCtrl);





userRouter.post('/register',userRegisterCtrl);


userRouter.post('/login',userLoginCtrl);


userRouter.get('/profile/:id',userGetProfile);




module.exports = userRouter;