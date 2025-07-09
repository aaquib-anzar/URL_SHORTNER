const User = require("../models/user.model")
const { v4: uuidv4 } = require('uuid');
const{generateToken} = require("../utils/auth.utils")
const bcrypt = require("bcryptjs")

const handleSignUp = async(req, res) => {
    const{username, email, password, role} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    await User.create({
        username,
        email,
        password:hashedPassword,
        role
    })

    return res.redirect("/login")
}
const handleLogin = async(req, res) => {
    const{email, password} = req.body

    const user = await User.findOne({
        email
    })
    if(!user){
        return res.render("login",{error:"Invalid email or password"})
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if(!matchPassword){
        return res.render("login",{error:"Invalid email or password"})
    }
    
    const token = generateToken(user)
    res.cookie("token",token)
    return res.redirect("/url")
    
    /* "Using Cookies"
    const sessionId = uuidv4()
    setUser(sessionId, user)
    const token = generateToken(user)
    res.cookie("uid", token)

    return res.redirect("/url") */

    /*Using Token
    const token = generateToken(user)
    res.json({token:token})*/

}

const handleLogout  = (req, res) => {
    console.log("from logout")
  res.clearCookie('token');
  return res.redirect("/login");
};

module.exports = {handleSignUp, handleLogin,handleLogout}