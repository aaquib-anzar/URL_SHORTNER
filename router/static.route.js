const express = require("express")
const{handleSignUpPage, handleLoginPage} = require("../controllers/static.controller")
const router = express.Router()


router.get("/",handleSignUpPage)
router.get("/login",handleLoginPage)

module.exports = router