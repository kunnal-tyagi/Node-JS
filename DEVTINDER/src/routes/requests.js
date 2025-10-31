const express=require('express')
const requestRouter=express.Router()
const UserAuth=require('../Middlewares/verify')

requestRouter.post('/sendConnectionRequest',UserAuth,(req,res)=>{
    const user=req.user;
console.log("Sending a connection request");
 res.send(user.firstname+" sent a connection request");

})

module.exports=requestRouter