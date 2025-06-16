const express = require("express")
const{handleSignUp, handleLogin, handleLogout} = require("../controllers/auth.controller")
const router = express.Router()

router.post("/signup",handleSignUp)
router.post("/login",handleLogin)
router.post("/logout",handleLogout)


module.exports = router