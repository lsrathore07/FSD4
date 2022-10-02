const db=require("../models")
const Category=db.Category;

exports.create=(req,res)=>{
    
  const category={
    name:req.body.name,
    description:req.body.description
  };

  Category.create(category)
 .then(category=>{
    console.log(`category with name ${category.name} created successfully`)
    res.status(201).send(category)

 })
 .catch((err)=>{
    res.status(500).send({message:"something went wrong"})
 })

}

exports.getAll=(req,res)=>{
   
    Category.findAll()
    .then(categories=>{
        res.send(categories)
    })
    .catch((err)=>{
        res.status(500).send({message:"something went wrong"})
     })
}

exports.getOne=(req,res)=>{
    const categoryId=req.params.id

    Category.findByPk(categoryId)
    .then((category)=>{
      if(!category){
        res.status(400).send({message:`cateegory with Id ${categoryId} not exists`})
       
      }
      res.send(category)
    })
    .catch((err)=>{
        res.status(500).send({message:err ||"something went wrong"})
     })
}

exports.update=(req,res)=>{
    const categoryId=req.params.id;

    const {name,description}=req.body;
  
    const category={}

    if(name){
        category.name=name
    }

    if(description){
        category.description=description
    }

    Category.update(category,{
    where:{
        id:categoryId
    }
    })
    .then((updatedCategory)=>{
        res.send(`updated ${updatedCategory[0]} records successfully`)
    })
    .catch((err)=>{
        res.status(500).send({message:err ||"something went wrong"})
     })
}
  
exports.delete=(req,res)=>{

   const categoryId=req.params.id;

    Category.destroy({
        where:{
            id:categoryId
    }})
    .then((data)=>{
        res.send({message:"data deleted successfully"})
    })
    .catch((err)=>{
        res.status(500).send({message:err ||"something went wrong"})
     })
}