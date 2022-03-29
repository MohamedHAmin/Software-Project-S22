const jwt=require('jsonwebtoken')
const User=require('../models/User')
const Admin=require('../models/Admin')


const auth =(role)=>{
    return async(req,res,next)=>{
        try{
            const token =req.header('Authorization').replace('Bearer ','')
            const decoded =jwt.verify(token,process.env.SECRET)
            let user;
            if(role==="admin"||role==="any")
            {
                user=await Admin.findOne({ _id:decoded._id})
                req.admin=true;
            }
            if(!user){
                if(role==="user"||role==="any")
                {
                    user=await User.findOne({ _id:decoded._id})
                    req.admin=false
                }
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
}
module.exports=auth