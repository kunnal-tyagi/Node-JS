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

connectionRequestSchema.index({fromUserID:1,ToUserID:1})
//it will be called before await x.save()
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if fromuserid and touserid are same
    if(connectionRequest.fromUserID.equals(connectionRequest.ToUserID)){
        throw new Error("Cannot send Connection Request to Yourself")
    }
    next();
})

const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports=ConnectionRequestModel;
