const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
isAdmin:{
  type:Boolean,
  // default:false
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