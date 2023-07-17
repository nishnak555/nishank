const Product =  require("../models/product")
const client =  require("../services/redis")
 const GetProductDetails =  async (req,res)=>{
const {ProductId:_id} = req.params
const cachekey =  `product:${ProductId}`

try {
 //check if the product details exist in the cache
 client.get(cachekey,async (error,cachedProduct)=>{
if(error){
  console.error('Redis GET error:',error)
}
if(cachedProduct){
 //product details found in the cache ,return the cached data
 const product =  JSON.parse(cachedProduct)
 res.json(product)
}else{
 //product details not found in the cache,fetch from the database
 const product =  await Product.findById({ProductId:_id})
 if(product){
  client.setEx(cachekey,3600,JSON.stringify(product))
  res.json(product)
 }else{
  res.status(400).json({error:"Product not found"})
 }
}

 })
} catch (error) {
 res.status(500).json({error:"Internal Server error"})
}
 }