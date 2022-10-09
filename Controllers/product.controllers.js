const {Product,Category,Sequelize}=require("../models")
const Op=Sequelize.Op


exports.create=(req,res)=>{
    
    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"})
    }

    const {name,description,cost,categoryId}=req.body;
    const product = {name,description,cost,categoryId};

    Product.create(product)
    .then((product)=>{
        res.status(201).send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong "})
    })
}

exports.findAll=(req,res)=>{

    const {name,minCost,maxCost}=req.query; 
    
    let productPromise=null;


    if(name){
        productPromise=Product.findAll({
            where:{
                name:req.query.name
               
            }
        })
    }
    else if(minCost){
        productPromise=Product.findAll({
            where:{
                cost:{
                    [cost.Op.gte]:req.query.minCost
            }
        }
        })
    }
    else if(maxCost){
        productPromise=Product.findAll({
            where:{
                cost:{
                    [Op.lte]:req.query.maxCost
                }    
            }
        })
    }
    else if(minCost && maxCost){
        productPromise=Product.findAll({
            where:{
                cost:{
                    [Op.gte]:minCost,
                    [Op.lte]:maxCost
                   
                }    
            }
        })
    }
    
    
    else(
        productPromise= Product.findAll()
    )

     productPromise   
    .then(products=>{
        res.send(products)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong "})
    })
}

exports.getOne=(req,res)=>{

    const productId=req.params.id;

    Product.findByPk(productId)
    .then(product=>{
        if(!product){
            res.status(404).send({message:`product with id ${productId} not exists`})
        }else
        res.send(product)
        
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong "})
    })
}

exports.update=(req,res)=>{
    
    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! oyu are unauthorized to perform this task"})
    }
    
    const productId=req.params.id

    const {name,description,cost}=req.body

    const product={}
    if(name){
    product.name=name }

    if(description){    
        product.description=description }
    
        if(cost){
        product.cost=cost }

        Product.update(product,{
            where:{
                id:productId
            }
        })
        .then((product)=>{
            res.send(`Product ${product[0]} updated successfully`)
        })
        .catch((err)=>{
            res.status(500).send({message:err.message || "Something went wrong "})
        })

}

exports.delete=(req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! oyu are unauthorized to perform this task"})
    }


    const productId=req.params.id;


    Product.destroy({
        where:{
            id:productId
        }
    })
    .then((product)=>{
        res.send(`product ${productId} delted successsfully`)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong "})
    })
}

exports.findProductByCategory=(req,res)=>{
    Product.findAll({
        where:{
            categoryId:req.params.categoryId
        }
    })
    .then(products=>{
          res.send(products)
    })
    .catch((err)=>{
         res.status(500).send({message:err.message || "Something went wrong "})
     })

            
}

exports.findProductUnderCategory=(req,res)=>{
    Product.findAll({
        where:{
            categoryId:req.params.categoryId,
            id:req.params.productId
        }
    })
    .then(product=>{
       res.send(product)
    })
    .catch((err)=>{
         res.status(500).send({message:err.message || "Something went wrong "})
     })

}