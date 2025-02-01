const express = require('express');
const { userRegistration, userLogin, socialLogin} = require('../controllers/auth.controller');



const authRouter=express.Router();

authRouter.post('/auth/register',userRegistration)
authRouter.post('/auth/login',userLogin)
authRouter.post('/auth/socialLogin',socialLogin)





module.exports = authRouter;
