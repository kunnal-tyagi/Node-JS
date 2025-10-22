const express=require("express")
const app=express()
const bcrypt=require("bcrypt")
const {info}=require("../database/mongo")
// Without this, req.body 
// will be undefined when you send JSON from Postman.
app.use(express.json())


app.post("/register",async (req,res)=>{
   const {firstname,lastname,password,email}=req.body;
   try {
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

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find the user in MongoDB
    const user = await info.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // 2️⃣ Compare the plain password with the hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).send("User verified successfully");
    } else {
      res.status(401).send("Incorrect password");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});