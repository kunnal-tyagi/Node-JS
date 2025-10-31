const jwt=require("jsonwebtoken");
const {info}=require('../database/mongo')
module.exports= async function UserAuth(req,res,next){
  try{
    
    
    const {token}=req.cookies;
    if (!token) return res.status(401).json({ message: "No token provided" });

  const {_id}=jwt.verify(token,process.env.JWT_SECRET);
  const user=await info.findById(_id);
  if(!user) throw new Error("User not found");
  //now user is attached with req object
  req.user=user;
  next();
}
  catch(err){
    res.status(401).send("Error" +err.message)
  }
}