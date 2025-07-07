/*State full authentication
const sessionIdToUserMap = new Map()

function setUser(id,user){
    sessionIdToUserMap.set(id,user)
}

function getUser(id){
    return sessionIdToUserMap.get(id)
}

module.exports = {setUser, getUser}*/

//Stateless authentication using JWT
const jwt = require("jsonwebtoken")
const SECRET = process.env.JWT_SECRET

const generateToken = (user) =>{
    const payload = {
        id:user._id,
        email:user.email,
        role:user.role
    }
    return jwt.sign(payload,SECRET)
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token,SECRET)
    } catch (error) {
        return null
    }
} 

module.exports = {generateToken, verifyToken}