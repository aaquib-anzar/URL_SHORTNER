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

// Use Render's port or fallback to 8000 locally
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

// 🟢 Add this root route for Render health check
/*app.get("/", (req, res) => {
  res.send("✅ URL Shortener backend is running");
});*/

app.use("/url", restrictTo(roles = ["normal", "admin"]), userRoutes);
app.use("/", staticRoutes);
app.use("/auth", authRoutes);

// ✅ Connect DB first, then start server
dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running at: ${PORT}`);
  });
});
