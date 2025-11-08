const express=require('express')
const requestRouter=express.Router()
const UserAuth=require('../Middlewares/verify');
const ConnectionRequestModel = require('../models/connectionRequest');
const { info } = require('../database/mongo');

requestRouter.post('/request/send/:status/:ToUserId',UserAuth,async (req,res)=>{
    try{
        const fromUserID=req.user._id;
        const ToUserID=req.params.ToUserId;
        const status=req.params.status;
        const allowedstatus=["ignored","interested"]    
        if(!allowedstatus.includes(status)){
 return res.status(401).json({message:"Invalid status type: "+status})
        } 
        // chech the user to which we are sending request that ig that person exist or not
        const checkUserInDb=await info.findById({_id:ToUserID});
        if(!checkUserInDb){
            return res.status(404).send("Profile not found");
        }
        //check if an existing request is there 
        const existingConnectionrequest=await ConnectionRequestModel.findOne({
            $or
            :[
               {
                fromUserID,ToUserID
               },{
                fromUserID:ToUserID,
                ToUserID:fromUserID
               }
            ],
            
        })
        if(existingConnectionrequest){
            return res.status(400).send({message:"Connection Request already exists"})
        }
        const RequestSchema=new ConnectionRequestModel({
            fromUserID,
            ToUserID,
            status
        }) 
        const data=await RequestSchema.save();
        res.json({
            message:req.user.firstname+"is "+status+"in "+ToUserID.firstname,
            data,
        });
    }catch(err){
        res.status(400).send("Error"+err.message)
    }

})

requestRouter.post("/request/review/:status/:requestId",UserAuth,async (req,res)=>{
    try{
        //loggedInUser should be touserid because he will reviuew if to accept or reject request
        //invite can be accepted or rejected only if status is interested because 
        //if the request was already ignored then there is no need to review
        //requestId should present in DB

        const loggedInUser=req.user;
        const {status,requestId}=req.params;
       
        const allowedstatus=["accepted","rejected"]
        if(!allowedstatus.includes(status)){
            return res.status(404).json({
                message:"Status not allowed"
            })
        }

        const connectionRequest=await ConnectionRequestModel.findOne({
            _id:requestId,
            ToUserID:loggedInUser._id,
            status:"interested"
        })

        if(!connectionRequest){
            return res.status(403).json({
                message:"Connection request not Found"
            })
        }
        connectionRequest.status=status;
        const data=await connectionRequest.save();
        res.json({message:"Connection request "+status+data})

    }catch(err){
        res.status(404).send("Error :"+ err.message)
    }

})



module.exports=requestRouter