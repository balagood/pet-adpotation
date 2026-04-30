import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' } // short-lived access token
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { _id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // long-lived refresh token
  );
};


//export default {generateAccessToken,generateRefreshToken}