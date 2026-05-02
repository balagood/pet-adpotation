import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    //const token = req.headers['authorization']?.split(' ')[1];
    const token = authHeader.startsWith("Bearer ")? authHeader.split(" ")[1]: authHeader;
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if (!decoded || (!decoded.id && !decoded._id)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    // Normalize user object (IMPORTANT FIX)
    req.user = {
      id: decoded.id || decoded._id,
      role: decoded.role,
    };

    next();
    // req.user = decoded; // attach user info to request
    // next();
    
  }
   catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export const shelterMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "shelter") {
    return res.status(403).json({
      message: "Access denied. Shelter only"
    });
  }

  next();
};

export default authMiddleware;