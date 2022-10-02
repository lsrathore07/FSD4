const jwt=require("jsonwebtoken")
const { User } = require("../models")

const verifyToken=(req,res,next)=>{

    const token=req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({message:" JWT token is missing"})

    }

    jwt.verify(token,process.env.SECRET_KEY,async function(err,decoded){
        if(err){
            return res.status(401).send({message:"Unauthorized!"})
        }

        const userId=decoded.id 
        const user=await User.findByPk(userId)
        req.user=user.dataValues;
        next();
              
        })
}

const authJWT={
   verifyToken
}

module.exports=authJWT;