const express =  require("express")
const app = express()
const dotenv =  require("dotenv")
const cors =  require("cors")
dotenv.config()
const cookieParser =  require("cookie-parser")

const session =  require("express-session")
const connection =  require("./db/connection")
const passport = require("./services/passport")

//Routes
const UserRoute =  require("./routes/user")


//middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(express.json())
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "nishank",
    resave: false,
    saveUninitialized: false,
  })
);


app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  })
);


//routes
app.use("/api/user", UserRoute);

app.listen(process.env.PORT||6000,()=>{
 console.log("App is running on port 6000..")
})
