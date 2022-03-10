const jwt=require('jsonwebtoken')
const Users=require('../models/users')


const auth =async(req,res,next)=>{
try{
    //const token = req.cookies['auth_token']
    const token =req.header('Authorization').replace('Bearer ','')
    const decoded =jwt.verify(token,process.env.SECRET)
    const user=await Users.findOne({ _id:decoded._id,'tokens.token':token})
    if(!user){
        throw new Error()
    }
    req.token=token
    req.user=user
    next()
}catch(e){
    res.status(400).send({error: 'please authenticate.'})

}
}
module.exports=auth