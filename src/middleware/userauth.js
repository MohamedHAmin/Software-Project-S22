const jwt=require('jsonwebtoken')
const User=require('../models/users')


const userauth =async(req,res,next)=>{
try{
    const token =req.header('Authorization').replace('Bearer ','')
    const decoded =jwt.verify(token,process.env.SECRET)
    const user=await User.findOne({ _id:decoded._id,'tokens.token':token})
    if(!user){
        throw new Error("Unauthorized")
    }
    req.token=token
    req.user=user
    next()
}catch(e){
    res.status(400).send(e+"")

}
}
module.exports=userauth