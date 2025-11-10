const express=require("express")
const UserRoutes=express.Router()
const UserAuth=require('../Middlewares/verify');
const ConnectionRequestModel = require("../models/connectionRequest");
const { info } = require("../database/mongo");
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

    const data=NoOfConnections.map((row)=>{
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.ToUserId
      }
      return row.fromUserId
    })

    res.json({
     data
    })
  }catch(err){
    res.status(500).send("Error : "+err.message)
  }
})

UserRoutes.get('/feed',UserAuth,async (req,res)=>{
  try{
  // User should see all card except
  //his own card
  //Already connected people
  //Ignored people
  //people whom already sent request


   const loggedInUser=req.user;

   const page=parseInt(req.query.page) || 1;
   let limit=parseInt(req.query.limit) || 10;
   limit=(limit>50)?50:limit;
   const skip=(page-1)*limit
   //find all request that i have send or recieved
   const Allreq=await ConnectionRequestModel.find({
    $or:[
      {fromUserId:loggedInUser._id},
      {ToUserId:loggedInUser._id}
    ]
   }).select("fromUserId ToUserId")

   const hideUsersfromFeed=new Set();
   Allreq.forEach((req)=>{
    hideUsersfromFeed.add(req.fromUserId.toString());
    hideUsersfromFeed.add(req.ToUserId.toString())
   })

   const UsersToAppear=await info.find({
    //find all the other users whose id is  not in this Array
    $and:[{_id:{ $nin: Array.from(hideUsersfromFeed)}},
      //$ne means not equal to       $nin means not in this array
      {_id:{$ne:loggedInUser._id}}
    ]
   }).select("firstname lastname age").skip(skip).limit(limit);
  }catch(err){
    res.send("Error :"+err.message)
  }
})
module.exports=UserRoutes