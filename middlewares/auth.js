const { verifyToken } = require("../utils/auth.utils");

function checkForAuthentication(req, res, next) {
  const cookieToken = req.cookies?.token;

  if (!cookieToken) return next();

  const user = verifyToken(cookieToken);

  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };

/* //Using Token
const restrictToLoggedInUser = async (req, res, next) => {
    const userid = req.headers["authorization"]
    
    if(!userid){
        return res.redirect("/login")
    }
    const token = userid.split("Bearer ")[1]
    const user = verifyToken(token)
    
    if(!user){
        return res.redirect("/login")
    }
    req.user = user
    next()
}
Using Cookies
const restrictToLoggedInUser = async (req, res, next) => {
    const userid = req.cookies?.uid
    
    if(!userid){
        return res.redirect("/login")
    }
    const user = verifyToken(userid)

    if(!user){
        return res.redirect("/login")
    }
    req.user = user
    next()
}*/
