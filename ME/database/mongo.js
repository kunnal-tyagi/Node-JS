const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect('mongodb+srv://testuser:namastenode@cluster0.cnp4x.mongodb.net/DevTinder')
.then(()=>{
    console.log("Db connected");
    
})
.catch(()=>{
    console.log("Errorrrrrrrrrr");
    
})

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
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Wrong Email")
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Make strong password")
            }
        },
        required:true
    }
})

const info=mongoose.model("User",UserSchema);
module.exports={info}
