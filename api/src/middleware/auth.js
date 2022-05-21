const jwt=require('jsonwebtoken')
const User=require('../models/User')
const Admin=require('../models/Admin.js')
const Token=require('../models/Token.js')



const auth =(role)=>{
    return async(req,res,next)=>{
        try{
            const token =req.header('Authorization').replace('Bearer ','')
            const decoded =jwt.verify(token,process.env.SECRET)
             const tokenIn=await Token.findOne({token:token})
             if (!tokenIn){ throw new Error()}
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
            req.token=tokenIn
            req.user=user
            next()
        }catch(e){
            res.status(401).send({error: 'Please Authenticate'})
        }
    }
}
module.exports=auth