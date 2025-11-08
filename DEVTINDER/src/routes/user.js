const express=require("express")
const UserRoutes=express.Router()
const UserAuth=require('../Middlewares/verify');
const ConnectionRequestModel = require("../models/connectionRequest");

//get all pending connection request for loggedinuser nothing more nothing less
UserRoutes.get('/user/requests',UserAuth,async (req,res)=>{
  try{
   const loggedInUser=req.user;
   const PendingRequest=await ConnectionRequestModel.find({
    ToUserId:loggedInUser._id,
    status:"interested"
   })
  }catch(err){
    res.status(400).send("Error :"+err.message)
  }
})
module.exports=UserRoutes