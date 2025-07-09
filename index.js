const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./router/auth.route");
const userRoutes = require("./router/url.route");
const staticRoutes = require("./router/static.route");
const { dbConnect } = require("./db_connect/url_db");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["normal", "admin"]), userRoutes);
app.use("/", staticRoutes);
app.use("/auth", authRoutes);

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at: ${PORT}`);
  });
});
