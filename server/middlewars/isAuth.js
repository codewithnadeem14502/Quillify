import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  const token = req.cookies["access-token"];
  // console.log(token);
  if (!token) {
    return res.json({ message: "The Token Is Missing" });
  } else {
    jwt.verify(token, "secret", (error, decoded) => {
      if (error) {
        console.error("Token verification error:", error);
        return res.json({ message: "Token Wrong" });
      } else {
        // console.log("Decoded Token:", decoded);
        req.email = decoded.email;
        // console.log("Decoded Email:", req.email);
        req.username = decoded.username;
        // console.log("Decoded Username:", req.username);
        next();
      }
    });
  }
};
