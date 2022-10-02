const express =require("express");
const config=require("./configs/db.config");
require("dotenv").config();
const bodyParser=require("body-parser")
const {Role, ROLES}=require("./models")
const {authJWT}=require("./Middlewares")


const app=express();

app.use(bodyParser.json())

const db=require("./models");
const rolesModel = require("./models/roles.model");

db.sequelize.sync({force:false})
.then(()=>{
    console.log("db synced");
})

//add roles



// Role.create({
//     id:4,
//     name:"user"
// })

// Role.create({
//     id:5,
//     name:"admin"
// })

require("./Routes/auth.routes")(app)

app.use(authJWT.verifyToken);

require("./Routes/category.routes")(app);
require("./Routes/product.routes")(app);
;
require("./Routes/user.routes")(app);

app.listen(process.env.PORT,()=>{
    console.log(`application is running on port ${process.env.PORT}`)
})