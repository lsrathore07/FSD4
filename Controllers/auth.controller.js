const {User, Role , Sequelize, ROLES} = require("../models");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

exports.signup= async (req,res)=>{

    var {username,email,password,roles}=req.body;

    if(!roles || !roles.length){
        roles=[ROLES[0]];
    }
     try{
    const user=await User.create({
        username:username,
        email:email,
        password:bcrypt.hashSync(password,8)
    })

    const userRoles=Role.findAll({ where:{name:{[Sequelize.Op.or] : roles}}})
    await  user.setRoles(userRoles)
    res.send({message:"User resgistered successfully"});
}catch(e){
     res.status(500).send({message:"Something went wrong"});
}    
}

exports.signin=async (req,res)=>{

    const {username,password}=req.body;

    if(!username || !password){
        res.status(400).send({message:"username or password cannot br empty"})
    }
    
    try{
    var user=await User.findOne({where:{username:username}})
    }catch(e){
        res.status(500).send({message:e.message})
    }
    if(!user){ return  res.status(401).send({message:"user not exist"})}
    var isPasswordValid=bcrypt.compareSync(password,user.password)
    if(!isPasswordValid){return res.status(400).send({message:"Invalid Password"})}
 
    const token=jwt.sign({id:user.id},process.env.SECRET_KEY,{})
    console.log(token)

    var roles=[]

    const allRoles=await user.getRoles()

     allRoles.forEach(role => {
        roles.push(role.name)
     });

    res.send({
        id:user.id,
        username:user.username,
        email:user.email,
        roles:roles,
        accessToken:token
    })  

}
       
        

        
    
 