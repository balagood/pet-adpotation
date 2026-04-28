import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export const shelterMiddleware = (req, res, next) => {
  if (req.user.role !== "shelter") {
    return res.status(403).json({
      message: "Access denied. Shelter only"
    });
  }

  next();
};

export default authMiddleware;