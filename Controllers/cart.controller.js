const { response } = require("express");
const { Cart, User, Product } = require("../models")


exports.create=async (req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"})
    }
      
    const userId=req.user.id;
   
    const user=await User.findByPk(userId);

    const cart=await Cart.create({userId:userId});
   
    res.send({message:"cart created successfully"})  
}


exports.update=async (req,res)=>{

    const userId=req.user.id;
   
    const user=await User.findByPk(userId);

    const cart=await user.getCart();
    if(!cart){
        res.send({message:"no cart is associated with this user"})
    }

    const userCart=await Cart.findByPk(cart.id)

    const newproducts=await Product.findAll({where:{id:req.body.products}})

    if(!newproducts){
       return res.send({message:"no product exists in the given product Id"})
    }

    const existingProducts=await userCart.getProducts();
    console.log(existingProducts)

    const updatedProducts=[...existingProducts,...newproducts]

    let totalCost=findTotalCost(updatedProducts)
    
    Cart.update({cost:totalCost},{where:{
        id:cart.id
}})
    
    userCart.setProducts(updatedProducts)

    res.send(updatedProducts)


}




exports.findCart=async (req,res)=>{
    const {cart,products}=await findProductsAndCart(req.user.id)

    res.send({products,totalCost:cart.cost})
}

exports.deleteProductFromCart=async (req,res)=>{

    const productId=parseInt(req.params.id);

    const userId=req.user.id;
   
    const user=await User.findByPk(userId);

    const cart=await user.getCart()
    if(!cart){
        res.send({message:"no cart is associated with this user"})
    }

    const userCart=await Cart.findByPk(cart.id)
    const existingProducts=await userCart.getProducts()

    const updatedProducts=existingProducts.filter((product)=>{
      return product.id!==productId;
       })
     
    const totalCost= findTotalCost(updatedProducts)
   Cart.update({cost:totalCost},{where:{
        id:cart.id
    }})  
    await userCart.setProducts(updatedProducts);
    res.send(updatedProducts); 
}

var findProductsAndCart= async (userId)=>{
   
    const user=await User.findByPk(userId);

    const cart=await user.getCart()
    if(!cart){
        res.send({message:"no cart is associated with this user"})
    }

    const userCart=await Cart.findByPk(cart.id)


    const existingProducts=await userCart.getProducts();
    //res.send(existingProducts)

    return ({cart:userCart,products:existingProducts})


}


const findTotalCost=(products)=>{
    let cost=0;

    for(let i=0;i<products.length;i++){
        cost+=products[i].cost
    }

    return cost;
}