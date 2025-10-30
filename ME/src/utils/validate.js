const validator=require('validator')

const ValidateProfileData=(req)=>{
    const allowedEdits=["firstname","lastname"]

    const isEditAllowed=Object.keys(req.body).every(field=>allowedEdits.includes(field));
    return isEditAllowed;
}

module.exports=ValidateProfileData