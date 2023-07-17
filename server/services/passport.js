const passport =  require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User =  require("../models/user")
passport.use(
new GoogleStrategy({
 clientID:process.env.Client_Id,
 clientSecret:process.env.clientSecret,
 callbackURL:process.env.CALLBACK_URL

},
async (accesstoken,refreshToken,profile,done)=>{
 try {
  let user =  await User.findOne({googleId:profile.id})
  if(!user){
   user =  new User({
    Username:profile.displayName,
    email:profile.emails[0].value,
    googleId:profile.id
   })
   await user.save()
  }
  return done(null,user)
 } catch (error) {
  return done(error)
 }
}

)
)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport