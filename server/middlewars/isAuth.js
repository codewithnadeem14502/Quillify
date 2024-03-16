// import jwt from "jsonwebtoken";
// export const isAuth = async (req, res, next) => {
//   const token = req.cookies["access-token"];
//   console.log("Token value :", token);
//   if (!token) {
//     return res.json({ message: "The Token Is Missing" });
//   } else {
//     jwt.verify(token, "secret", (error, decoded) => {
//       if (error) {
//         console.error("Token verification error:", error);
//         return res.json({ message: "Token Wrong" });
//       } else {
//         // console.log("Decoded Token:", decoded);
//         req.email = decoded.email;
//         // console.log("Decoded Email:", req.email);
//         req.username = decoded.username;
//         // console.log("Decoded Username:", req.username);
//         next();
//       }
//     });
//   }
// };
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Missing Bearer token" });
  }

  const token = authorizationHeader.split(" ")[1];
  
  jwt.verify(token, "secret", (error, decoded) => {
    if (error) {
      console.error("Token verification error:", error);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    } else {
      req.email = decoded.email;
      req.username = decoded.username;
      next();
    }
  });
};
