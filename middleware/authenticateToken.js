
const jwt = require("jsonwebtoken");
const authToken = (req, res, next) => {
  console.log("req>>",req);
  
    const token = req.cookies.token;
     console.log("token",token);
     
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };


  module.exports={
    authToken
  }