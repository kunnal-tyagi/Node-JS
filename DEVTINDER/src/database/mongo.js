
const mongoose=require('mongoose')
const validator=require('validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose.connect('mongodb+srv://kunaltyyagi_db_user:64HdwAU3sfwBQe2B@devbase.w3vnmr3.mongodb.net/DEVTINDER')
.then(()=>{
    console.log("Db connected");
    
})
.catch((err) => console.log("MongoDB connection error:", err.message));
// mongoose.connect('mongodb+srv://testuser:namastenode@cluster0.cnp4x.mongodb.net/DevTinder')
// .then(()=>{
//     console.log("Db connected");
    
// })
// .catch((err) => console.log("MongoDB connection error:", err.message));


const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true
    },
    lastname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,//when we do unique true it automatically creates index,index helps to fetch data from db faster
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Wrong Email")
            }
        }
    },
    password:{
        type:String,
// It’s better to remove password validation on the Mongoose level because you’re hashing it before saving, and isStrongPassword() will fail since it checks the plain password after hashing.
// So instead, validate before hashing (in the route), or disable validator for password in the schema.

        // validate(value){
        //     if(!validator.isStrongPassword(value)){
        //         throw new Error("Make strong password")
        //     }
        // },
        required:true
    },
     gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender type`,
      },
      // validate(value) {
      //   if (!["male", "female", "others"].includes(value)) {
      //     throw new Error("Gender data is not valid");
      //   }
      // },
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
      type: String,
      default: "This is a default about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
    
)



UserSchema.methods.getJWT=function(){
    //creates instance of model
    //this doesnt wrk with arrow fn.
    const user=this;
     const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,
{
        expiresIn:"7d"
      });
      return token;
}
UserSchema.methods.encrypt=async function(inputPassword){
    const user=this;
    const isPasswordValid=await bcrypt.compare(inputPassword, user.password);
    return isPasswordValid;
}

const info=mongoose.model("User",UserSchema);
module.exports={info}
