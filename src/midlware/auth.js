const jwt=require('jsonwebtoken')
const User=require('../models/users')
const Admin=require('../models/admin')


const auth =async(req,res,next)=>{
try{
    const token =req.header('Authorization').replace('Bearer ','')
    const decoded =jwt.verify(token,process.env.SECRET)
    var user=await Admin.findOne({ _id:decoded._id,'tokens.token':token})
    req.admin=true;
    if(!user){
        user=await User.findOne({ _id:decoded._id,'tokens.token':token})
        req.admin=false
        if(!user){
            throw new Error()
        }
    }
    req.token=token
    req.user=user
    next()
}catch(e){
    console.log(e)
    res.status(400).send({error: 'please authenticate.'})

}
}
module.exports=auth