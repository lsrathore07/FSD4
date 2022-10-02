const {signUpValidator}=require("../Middlewares")
const authController=require("../Controllers/auth.controller")

module.exports=(app)=>{
    app.post("/ecomm/api/v1/auth/signup",[signUpValidator.checkDuplicateUsernameOrEmail,signUpValidator.checkRolesExists],authController.signup);
    app.post("/ecomm/api/v1/auth/signin",authController.signin)
}