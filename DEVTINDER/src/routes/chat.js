const express=require("express");
const chatRouter=express.Router();
const Chat = require("../models/chat.js");
const UserAuth = require("../Middlewares/verify.js");
chatRouter.get('/chat',UserAuth,async (req,res)=>{
  const {targetUserId}=req.body;
  const userID=req.user._id;
  try{
    let chat=await Chat.findOne({participants:{$all:[userID,targetUserId]}});
    if(!chat){

    }
  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
})


module.exports=chatRouter;