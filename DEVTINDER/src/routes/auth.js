const express=require("express")
const Authrouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const validator=require('validator')
const {info}=require("../database/mongo")


Authrouter.post("/register", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      gender,
      age,
      isPremium,
      membershipType,
      photoUrl,
      about,
      skills
    } = req.body;

    // 1️⃣ Strong Password Check
    if (!validator.isStrongPassword(password)) {
      return res.status(400).send("Password not strong enough");
    }

    // 2️⃣ Hash Password (async) without await it returns a object as hash is a cpu heavyu task 
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create New User from JSON Body
    const user = new info({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      gender,
      age,
      isPremium,
      membershipType,
      photoUrl,
      about,
      skills
    });

    // 4️⃣ Save User to MongoDB
    await user.save();

    // 5️⃣ Success Response
    res.status(201).send("User registered successfully");
  } 
  catch (error) {
    console.log(error);

    // MongoDB unique email error
    if (error.code === 11000) {
      return res.status(400).send("Email already exists");
    }

    res.status(500).send("Error: " + error.message);
  }
});


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