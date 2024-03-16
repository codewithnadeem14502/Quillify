import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const token = req.cookies["access-token"]; // Assuming your token is stored in a cookie named "access-token"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Missing access token" });
  }
  
  try {
    const decoded = jwt.verify(token, "your_secret_key_here");
    req.email = decoded.email;
    req.username = decoded.username;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
