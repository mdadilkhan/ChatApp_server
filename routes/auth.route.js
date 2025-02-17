const express = require('express');
const { userRegistration, userLogin, socialLogin,logout} = require('../controllers/auth.controller');
const { authToken } = require('../middleware/authenticateToken');



const authRouter=express.Router();

authRouter.post('/auth/register',userRegistration)
authRouter.post('/auth/login',userLogin)
authRouter.post('/auth/socialLogin',socialLogin)
authRouter.post("/auth/logout", logout);





module.exports = authRouter;
