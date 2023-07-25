const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate:{
      validator:function (email){
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      },
      message:'Invalid email format'
      }
    },
    password: {
      type: String,
      required: true,
    
    },
    gender: {
      type: String,
    },
    Address: {
      type: String,
    },
    Username: {
      type: String,
      required: true,
    },
DateOfBirth:{
type:String
},

googleId:{
  type:String
},


    Otp: {
      type: Number,
    },
    resetToken:{
      type:String
    },
    resetTokenExpiration:{type:Date},
MobileNumber:{
 type:Number
}
  },
  { timestamps: true }
);
const User =  mongoose.model("Users",UserSchema)
module.exports = User