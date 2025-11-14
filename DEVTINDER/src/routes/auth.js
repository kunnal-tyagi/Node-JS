const express=require("express")
const Authrouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const validator=require('validator')
const {info}=require("../database/mongo")


Authrouter.post("/register",async (req,res)=>{
   const {firstname,lastname,password,email}=req.body;
   try {
    if (!validator.isStrongPassword(password)) {
  return res.status(400).send("Password not strong enough");
}

    // bcrypt hashing is CPU-heavy → runs asynchronously.
// Without await, MongoDB gets [object Promise] instead of "hashed_value".
    const hashedpassword=await bcrypt.hash(password,10);
    const data=new info({
        firstname:firstname,
        lastname,
        email,
        password:hashedpassword
    })
    await data.save();
    res.status(201).send("User registered successsfully");
   } catch (error) {
    
       console.log(error);
       res.status(404).send("Error : "+error);
   }
})

Authrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  

  try {
    // 1️⃣ Find the user in MongoDB
    const user = await info.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // 2️⃣ Compare the plain password with the hashed password in DB
    const isPasswordValid =await user.encrypt(password);
    
    if (isPasswordValid) {
      // jwt.sign() is synchronous by default.
// So you don’t actually need await unless you use the callback version
      const token=user.getJWT();
      console.log(token);
      
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // localhost must be false
      sameSite: "lax", // localhost must be lax
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });



res.status(200).send(user);

    } else {
      res.status(401).send("Incorrect password");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
  }
});

Authrouter.post('/logout',(req,res)=>{
  res.cookie("token",null,{
    expires:new Date(Date.now()),
  })
  res.send("Logged out Successfully")
})

module.exports=Authrouter