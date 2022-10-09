const categoryControllers=require("../Controllers/category.controller")
const {requestValidator, authJWT}=require("../Middlewares")

module.exports=(app)=>{

    app.post("/ecomm/api/v1/category",[requestValidator.validateCategoryRequest,authJWT.verifyToken],categoryControllers.create);
    app.get("/ecomm/api/v1/category",categoryControllers.getAll);
    app.get("/ecomm/api/v1/category/:id",categoryControllers.getOne);
    app.put("/ecomm/api/v1/category/:id",authJWT.verifyToken,categoryControllers.update);
    app.delete("/ecomm/api/v1/category/:id",authJWT.verifyToken,categoryControllers.delete);
}