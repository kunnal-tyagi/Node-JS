const express=require("express")
const UserRoutes=express.Router()
const UserAuth=require('../Middlewares/verify');
const ConnectionRequestModel = require("../models/connectionRequest");
//read about ref,populate
//get all pending connection request for loggedinuser nothing more nothing less
UserRoutes.get('/user/requests',UserAuth,async (req,res)=>{
  try{
   const loggedInUser=req.user;
   const PendingRequest=await ConnectionRequestModel.find({
    ToUserId:loggedInUser._id,
    status:"interested"
   }).populate("fromUserId",["firstname","lastname"])
  }catch(err){
    res.status(400).send("Error :"+err.message)
  }
})

UserRoutes.get('/user/connections',UserAuth,async (req,res)=>{
  try{
    const loggedInUser=req.user;
    const NoOfConnections=await ConnectionRequestModel.find({
      $or:[
        {ToUserId:loggedInUser._id,status:"accepted"},
        {fromUserId:loggedInUser._id,status:"accepted"}
      ]
    }).populate("fromUserId","firstname lastname").populate("ToUserId","firstname lastname")

    res.json({
     data:NoOfConnections
    })
  }catch(err){
    res.status(500).send("Error : "+err.message)
  }
})
module.exports=UserRoutes