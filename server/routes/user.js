const express =  require("express")
const router =  express.Router()
const Controller = require("../controllers/user")
const {
  authenticateToken,
  verifyTokenandAuthorization,
} = require("../Middleware/Auth");
//Register 
router.post('/register',Controller.SignupController)

// login
router.post("/login",Controller.loginController)

//Update
router.put("/:id",verifyTokenandAuthorization,Controller.UpdateController)

//Delete
router.delete("/:id",verifyTokenandAuthorization,Controller.DeleteUser)


module.exports = router