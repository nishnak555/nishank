const express =  require("express")
const  router  = express.Router()
const {
 createProduct
} =  require("../controllers/product")
const {
  authenticateToken,
  verifyTokenandAuthorization,
  verifyTokenAndAdmin,
} = require("../Middleware/Auth");
//create Product 
router.post('/',verifyTokenAndAdmin,createProduct)


//update product
