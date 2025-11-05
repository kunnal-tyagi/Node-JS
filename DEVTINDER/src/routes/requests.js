const express=require('express')
const requestRouter=express.Router()
const UserAuth=require('../Middlewares/verify');
const ConnectionRequestModel = require('../models/connectionRequest');

requestRouter.post('/request/send/:status/:ToUserId',UserAuth,async (req,res)=>{
    try{
        const fromUserID=req.user._id;
        const ToUserID=req.params.ToUserId;
        const status=req.params.status;
        const allowedstatus=["ignored","interested"]    
        if(!allowedstatus.includes(status)){
 return res.status(401).json({message:"Invalid status type: "+status})
        } 
        
        //check if an existing request is there 
        const existingConnectionrequest=await ConnectionRequestModel.findOne({
            fromUserID,ToUserID
        })
        const RequestSchema=new ConnectionRequestModel({
            fromUserID,
            ToUserID,
            status
        }) 
        const data=await RequestSchema.save();
        res.json({
            message:"Connection Request send Successfully!",
            data,
        });
    }catch(err){
        res.status(400).send("Error"+err.message)
    }

})

module.exports=requestRouter