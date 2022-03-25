const jwt=require('jsonwebtoken')
const User=require('../models/users')
const Admin=require('../models/admin')


const adminauth =async(req,res,next)=>{
try{
    const token =req.header('Authorization').replace('Bearer ','')
    const decoded =jwt.verify(token,process.env.SECRET)
    const admin=await Admin.findOne({ _id:decoded._id,'tokens.token':token})
    if(!admin){
        throw new Error("Unauthorized")
    }
    req.token=token
    req.admin=admin
    next()
}catch(e){
    res.status(400).send(e+"")

}
}
module.exports=adminauth