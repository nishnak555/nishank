const jwt  = require("jsonwebtoken")
const  authenticateToken = (req,res,next)=>{
 const token =  req.cookies.auth
if(!token){
 return res.status(401).json({error:'Unauthorized'})
}
jwt.verify(token,'your_secret_key',(err,decoded)=>{
 if(err){
  return res.status(403).json({error:'Invalid token'})
 }
 req.user = decoded
 next()
})

}
const verifyTokenandAuthorization = (req,res,next)=>{
 authenticateToken(req,res,()=>{
  if(req.user.id===req.params.id){
   next()
  }else{
   res.status(403).json("you are not allowed to do that")
  }
 })
}

const verifyTokenAndAdmin =  (req,res,next)=>{
 authenticateToken(req,res,()=>{
  if(req.user.isAdmin){
   next()
  }else{
   res.status(403).json("you are not allowed to do that!")
  }
 })
}
module.exports = {
 authenticateToken,verifyTokenandAuthorization,
 verifyTokenAndAdmin
}

