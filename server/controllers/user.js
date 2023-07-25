const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {
  authenticateToken,
  verifyTokenandAuthorization,
} = require("../Middleware/Auth");

//Register Controller

const SignupController = async (req, res) => {
  const {
    email,
    password,
    Username,
    Address,
    gender,
    MobileNumber,
    DateOfBirth,
    
    
  } = req.body;
  console.log(req.body)
      if (email === " " || password === "" || Username === "") {
        return res
          .status(400)
          .json({ message: "email,password and username required" });
      }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "Email  already exists" });
    }

    // const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new User({
      password,
      email,
      Username,
      Address,
      gender,
      MobileNumber,
      DateOfBirth,
      
      
      
    });

    await newuser.save();
    res.status(200).json({ message: "User registered Successfully" });
  } catch (error) {
    console.error("Signup error:;error");
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller

const loginController = async (req, res) => {
  
  const { email, password} = req.body;
  console.log(req.body)
      if (email === " " || password === "") {
        return res.status(400).json({ message: "email,password  required" });
      }
  try {
    const user = await User.findOne({email}  
);
    if (!user) {
      return res.status(404).json({message:"user not found"})
      // throw new Error("Email not found");
    }
 
    const isPasswordMacth = await bcrypt.compare(password, user.password);
    if (!isPasswordMacth) {
      return res.status(401).json({message:"unauthorized"})
    }

    const auth = jwt.sign({ id:user._id,userName:user.Username}, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    
    res.cookie("auth", auth, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
     res.json({ success: true,username:user.Username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "internal server error" });
  }
};

// Update
const UpdateController = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hash(req.body.password, 10);
  }
  try {
    const UpdatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(UpdatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get user data
const GetUser =  async (req,res)=>{
  try {
    const user =  await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

// Delete User
const DeleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

//
const ForgePassword =  async(req,res)=>{
  const {email} =  req.body
  //find the user in your database

  const user =  await User.findOne({email})
  if(!user){
return res.status(404).json({message:"User not found"})
  }
  //Generate a random password reset token
  const token =  Math.random().toString(36).substring(7)
  //Hash the token using bcrypt
  const hashedToken = await bcrypt.hash(token,10)
  //store the hashed token and expiration time in the user's document

  user.resetToken =hashedToken
  user.resetTokenExpiration = Date.now() + 3600000 //Token valid for 1 hour
  await user.save()

}

//Reset Password
const ResetPassword =  async (req,res)=>{
  const {token} = req.params
  const {password} = req.body
  //Find the user with the provided token and valid expiration time
  const user  = await User.findOne({
    resetToken:token,
    resetTokenExpiration:{$gt:Date.now()}
  })
  if(!user){
    return res.status(400).json({message:'Invalid or expired token'})
  }
//Reset the user's password 
user.password =  await bcrypt.hash(password,10)
user.resetToken = undefined
user.resetTokenExpiration =undefined
await user.save()
res.status(200).json({message:"Password reset successfully"})
}


//Logout user
 const LogoutUser = async(req,res)=>{
  //clear th token cookie
  res.clearCookie('auth')

  res.redirect('/login')
  res.status(200).json({message:'Logged out successfully'})
 }

module.exports = {
  SignupController,
  loginController,
  UpdateController,
  DeleteUser,
  LogoutUser,
  GetUser

};


