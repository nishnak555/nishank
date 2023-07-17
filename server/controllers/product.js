const Product = require("../models/product");
const {
  authenticateToken,
  verifyTokenandAuthorization,
  verifyTokenAndAdmin,
} = require("../Middleware/Auth");
const Product = require("../models/product");


//Create 
const CreateProduct =  async(req,res,next)=>{
 const newProduct =  new Product(req.body
  )
  try{
const savedProduct =  await newProduct.save()
res.status(200).json(savedProduct)
  }catch(error){
res.status(500).json(error)
  }
}


//Update Product
 const UpdateProduct =  async(req,res)=>{

  try{
  const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
    $set:req.body
  },{new:true})

res.status(200).json(updateProduct)

  }catch(error){
res.status(500).json(error)
  }
 }
// Delete Product
const DeleteProduct =  async (req,res)=>{
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted..")
  } catch (error) {
    res.status(500).json(error)
  }
}
// Get Product
const GetProduct =  async (req,res)=>{
  try {
    const product =  await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(error)
  }
}
// sort  Products
 const GetSortedAndPaginationProducts =  async (req,res)=>{
  try {
    const{sort,page,limit} = req.query
    let sortCriteria = {}

    //set the sorting criteria based on the provided query parameter
    switch(sort){
      case  'priceLowToHigh':
        sortCriteria = {price:1}
        break

        case 'priceHighToLow':
          sortCriteria = {price:-1}
          break;
          case 'new':
            sortCriteria = {createdAt:-1}
            break
           default:
            //No sorting creteria specified,return all products
            break;
    }
    const skip  = (parseInt(page)-1)*parseInt(limit)

    const products = await Product.find().sort(sortCriteria).skip(skip).limit(parseInt(limit))

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
 }


 // filter Product 
const FilterByColor =  async (req,res)=>{
  try {
    const {color } = req.query
    const Products = await Product.find({color})
    res.status(200).json(Products)
  } catch (error) {
    res.status(500).json({error:"Internal server error"})
  }
}

const FilterByPriceRange =  async (req,res)=>{
  try {
    const {minPrice,MaxPrice} = req.query
    const Products = await Product.find({
      price:{$gte:minPrice,$lte:MaxPrice}
    }).sort({price:1})
    res.status(200).json(Products)
  } catch (error) {
    res.status(500).json({error:'Internal Server error'})
  }
}






//
const GetMenProducts =  async (req,res)=>{
  try {
    const products =   await Product.find({categories:'men'})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
}
const GetWomenProducts =  async (req,res)=>{
  try {
    const products =  await Product.find({categories:'women'})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error:"Internal server error"})
  }
}
const GetKidsProducts =  async (req,res)=>{
  try {
    const products =  await  Product.find({categories:'kids'})
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({error:'Internal server error'})
  }
}
module.exports =  {
 CreateProduct
}