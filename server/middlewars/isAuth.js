import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // console.log("Token ", token);

      if (!token) {
        return res.json({ message: "The Token Is Missing" });
      } else {
        const decoded = jwt.verify(token, "secret");
        // If you need to use the decoded information, you can access it via `decoded`
        req.id = decoded.id;
        req.email = decoded.email;
        req.Date = decoded.Date;
        req.pgplantype = decoded.pgplantype;

        next();
      }
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    return res.status(404).json({ message: "No token, no authorization" });
  }
};

export default isAuth;

// import jwt from "jsonwebtoken";
// export const isAuth = async (req, res, next) => {
//   const token = req.cookies["access-token"];
//    const cookieHeader = req.headers.cookie;
//    console.log("Cookie Header :", cookieHeader);
//    console.log("cookie req.cookie = ",req.cookies["access-token"]);
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
