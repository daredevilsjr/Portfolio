const jwt = require('jsonwebtoken');

const authenticateAdmin = async(req, res, next) => {
   try {
      const token = req.cookies.token;
      if(!token) {
         return res.status(401).json({
         success: false,
         message: "Access denied. Please login first.",
         });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(decoded.role!=='admin') {
         return res.status(403).json({
         success: false,
         message: "Admin access only.",
         });
      }
      req.user = decoded;
      next();
   }
   catch(error) {
      return res.status(500).json({
         success: false,
         message: "Admin only or token expired login again",
      });
   }
};

module.exports = authenticateAdmin;
