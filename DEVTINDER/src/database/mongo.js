
const mongoose=require('mongoose')
const validator=require('validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose.connect('mongodb+srv://testuser:namastenode@cluster0.cnp4x.mongodb.net/DevTinder')
.then(()=>{
    console.log("Db connected");
    
})
.catch((err) => console.log("MongoDB connection error:", err.message));


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
     photoUrl: {
        type: String,
        default: "https://api.dicebear.com/7.x/avataaars/svg?seed=MaleUser&topType=ShortHairShortCurly&facialHairType=BeardMedium&clotheType=ShirtCrewNeck"
    }
    
})



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
