
const { User,ROLES } = require("../models");

const checkDuplicateUsernameOrEmail=(req,res,next)=>{

    const {username,email}=req.body;

    const checkUsername=User.findOne({
        where:{
            username:username
        }
    })

    const checkEmail=User.findOne({
        where:{
            email:email
        }
    })

    Promise.all([checkUsername,checkEmail])
    .then(users=>{
        if(users[0] || users[1]){
            res.status(400).send({message:"Failed! username or email already exist"})
           return;
        }
        next();
    })
    .catch(err=>{
        res.status(500).send({message:"Something went wrong"}) 
       })
}

const checkRolesExists=(req,res,next)=>{

    const roles=req.body.roles;

    if(roles){

        for(let i=0;i<roles.length;i++){
            if(!ROLES.includes(roles[i])){
                res.status(400).send({message:"Failed! roles does not exists" +roles[i]})
             return;
            }
        }
    }
    next()
}

const verifySignUp={
    checkDuplicateUsernameOrEmail,
    checkRolesExists
}

module.exports=verifySignUp;