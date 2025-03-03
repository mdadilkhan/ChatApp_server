const express = require('express');
const { authToken } = require('../middleware/authenticateToken');
const { createConversation } = require('../controllers/conversation.controller');



const conversationRouter=express();


conversationRouter.post('/conversation/createConversation',authToken,createConversation)







module.exports = conversationRouter;