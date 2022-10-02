const productControllers=require("../Controllers/product.controllers")
const {requestValidator}=require("../Middlewares");

module.exports=(app)=>{
    app.post("/ecomm/api/v1/products",requestValidator.validateProductRequest,productControllers.create);
    app.get("/ecomm/api/v1/products",productControllers.findAll);
    app.get("/ecomm/api/v1/products/:id",productControllers.getOne);
    app.put("/ecomm/api/v1/products/:id",productControllers.update)
    app.delete("/ecomm/api/v1/products/:id",productControllers.delete)
    app.get("/ecomm/api/v1/category/:categoryId/products",requestValidator.validateCategoryPassed,productControllers.findProductByCategory)
    app.get("/ecomm/api/v1/category/:categoryId/products/:productId",requestValidator.validateCategoryAndProductPassed,productControllers.findProductUnderCategory)
}