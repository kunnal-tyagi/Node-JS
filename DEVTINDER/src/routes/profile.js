const expres=require('express')
const profilerouter=expres.Router()
const UserAuth=require('../Middlewares/verify')
const ValidateProfileData=require('../utils/validate')
profilerouter.get("/profile/view", UserAuth,async (req, res) => {
  try {
    
    const user = req.user;

    res.status(200).send(user);
  } catch (err) {
    res.status(401).send("Invalid or expired token"+err.message);
  }
});

profilerouter.patch('/profile/edit',UserAuth,async (req,res)=>{
  try{
    if(!ValidateProfileData(req)){
      throw new Error("Invalid Edit required")
    }
    const LoggedInuser=req.user;
    console.log(LoggedInuser);
    
    Object.keys(req.body).forEach((key)=> (LoggedInuser[key]=req.body[key]));
    await LoggedInuser.save();
    
res.send("Updated");
  }
   catch(err){
  res.send(err.message)
 }
})

profilerouter.patch('/profile/password',(req,res)=>{
  
})
module.exports=profilerouter