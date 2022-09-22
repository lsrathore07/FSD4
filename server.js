const express =require("express");
const config=require("./configs/db.config");
require("dotenv").config();



const app=express();

const db=require("./models/index");
db.sequelize.sync({force:false})
.then(()=>{
    console.log("db synced");
})

app.listen(process.env.PORT,()=>{
    console.log(`application is running on port ${process.env.PORT}`)
})