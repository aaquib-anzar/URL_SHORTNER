const express = require("express")
const cookieParser = require("cookie-parser")
const path = require("path")
const PORT = 8000
const authRoutes = require("./router/auth.route")
const userRoutes = require("./router/url.route") 
const staticRoutes = require("./router/static.route")
const{dbConnect} = require("./db_connect/url_db")
const {checkForAuthentication, restrictTo} = require("./middlewares/auth")

const app = express()

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views")); 
app.use(express.urlencoded({extended:false}))// to parse the form data
app.use(express.json())// to parse the json data
app.use(cookieParser())
app.use(checkForAuthentication)

app.use("/url",restrictTo(roles = ["normal","admin"]),userRoutes)
app.use("/",staticRoutes)
app.use("/auth",authRoutes)


dbConnect()

app.listen(PORT, () => console.log(`Server is connected at: ${PORT}`));