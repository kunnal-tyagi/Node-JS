const mongoose=require('mongoose')
const connectionRequestSchema=new mongoose.Schema({
    fromUserID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    ToUserID:{
        type:mongoose.Schema.Types.ObjectId,
         required:true,
    },
    status:{
        type:String,
         required:true,
        // enum: Array, creates a validator that checks if 
        // the value is strictly equal to one of the values in the given array.

        enum:{
            values:["ignore","interested","rejected","accepted"],
            message:'enum validator failed for path `{PATH}` with value `{VALUE}`'
        }
    }
},{
    timestamps:true
})


const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports=ConnectionRequestModel;
