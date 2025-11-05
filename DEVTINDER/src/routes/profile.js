const expres=require('express')
const bcrypt=require('bcrypt')
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

profilerouter.patch('/profile/password', UserAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=profilerouter