const nodemailer =  require("nodemailer")

//configure nodemailer with your email service provider details
const transporter =  nodemailer.createTransport({
 service:'',
 auth:{
  user:"",
  pass:''
 }
})
//Compose the email

const mailOptions =  {
 from:"",
 to:"",
 subject:"Password Reset",
 text:""

}

//send the email
transporter.sendMail(mailOptions,(error,info)=>{
 if(error){
  console.log(error)
  res.status(500).json({message:'Error sending email'})
 }else{
  res.status(200).json({message:"Email sent Successfully"})
 }
})

module.exports= {nodemailer}