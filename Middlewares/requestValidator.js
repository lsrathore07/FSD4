const {Category, Product}=require("../models")


const validateCategoryRequest=(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({message:"name of the category cant be empty"})
        return;  
    }
    next();
    
 }

 const validateProductRequest=(req,res,next)=>{

    if(!req.body.name || !req.body.cost){
        res.status(400).send({message:"name or cost of the Product cannot be empty"})
       return ;
    }

    if(!req.body.categoryId){
        res.status(400).send({message:"category of the Product cannot be empty"})
        return ;
    }

    Category.findByPk(req.body.categoryId)
    .then(category=>{
        if(!category){
            req.status(400).send({message:`category id passed ${req.body.categoryId} is not available`})
    
        }
        next()
    })
    .catch(err=>{
        res.status(500).send({message:"Something went wrong"})
    })

 }

 const validateCategoryPassed=(req,res,next)=>{
    const categoryId=parseInt(req.params.categoryId)
    
    if(!categoryId){
        res.status(400).send({message:`category Id is not passed or having invalid datatype`})
    }

    Category.findByPk(categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category id passed ${res.params.categoryId} is not available`})
          return;
        }
        next();
    })
    .catch(err=>{
        res.status(500).send({message:"Something went wrong"})
    })
 }

 const validateCategoryAndProductPassed=(req,res,next)=>{
    const categoryId=parseInt(req.params.categoryId)
    const productId=parseInt(req.params.productId)
    
    if(!categoryId){
        res.status(400).send({message:`category Id is not passed or having invalid datatype`})
    }

    if(!productId){
        res.status(400).send({message:`product Id is not passed or having invalid datatype`})
    }

    Category.findByPk(categoryId)
    .then(category=>{
        if(!category){
            res.status(400).send({message:`category id passed ${res.params.categoryId} is not available`})
          return;
        }

        Product.findByPk(productId)
        .then(product=>{
            if(!product){
                res.status(400).status({message:`product is passed ${req.params.productId} not available`})
            return;
            }
           next();
        })
    })
    .catch(err=>{
        res.status(500).send({message:"Something went wrong"})
    })



 }

 module.exports={
  
    validateCategoryRequest:validateCategoryRequest,
    validateProductRequest:validateProductRequest,
    validateCategoryPassed:validateCategoryPassed,
    validateCategoryAndProductPassed:validateCategoryAndProductPassed

}