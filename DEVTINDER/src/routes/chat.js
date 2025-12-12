const express=require("express");
const chatRouter=express.Router();
const Chat = require("../models/chat.js");
const UserAuth = require("../Middlewares/verify.js");
chatRouter.get('/chat/:targetUserId',UserAuth,async (req,res)=>{
  const {targetUserId}=req.params;
  const userID=req.user._id;
  try{
    let chat=await Chat.findOne({
      participants:{$all:[userID,targetUserId]}
    }).populate({
      path:'messages.senderID',
      select:"firstname lastname"
    });
    if(!chat){
         chat=new Chat({
          participants:[userID,targetUserId],
          messages:[]
         });
         await chat.save();
    }
    res.status(200).json(chat);
  }catch(err){
    res.status(500).json({message:"Server Error"});
  }
})


module.exports=chatRouter;