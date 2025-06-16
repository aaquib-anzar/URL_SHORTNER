const URL = require("../models/url.model")



const handleSignUpPage = (req,res) => {
    return res.render("signup")
}

const handleLoginPage = (req,res) => {
    return res.render("login")
}

module.exports = { handleSignUpPage, handleLoginPage}