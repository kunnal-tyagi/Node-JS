const express=require("express");
const chatRouter=express.Router();
const Chat = require("../models/chat.js");

chatRouter.get('/chat')


module.exports=chatRouter;