// import jwt from "jsonwebtoken";

// export const isAuth = async (req, res, next) => {
//   let token = "";
//   // console.log("Is auth is working ");

//   try {
//     token = req.cookies["access-token"];
//     console.log("Token ", token);

//     if (!token) {
//       return res.json({ message: "The Token Is Missing" });
//     } else {
//       const decoded = jwt.verify(token, "secret");
//       // If you need to use the decoded information, you can access it via `decoded`
//       req.username = decoded.username;
//       req.email = decoded.email;

//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ message: "Not authorized" });
//   }

//   if (!token) {
//     return res.status(404).json({ message: "No token, no authorization" });
//   }
// };
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  let token = "";

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Token ", token);

      if (!token) {
        return res.json({ message: "The Token Is Missing" });
      } else {
        const decoded = jwt.verify(token, "secret");
        // If you need to use the decoded information, you can access it via `decoded`
     req.username = decoded.username;
     req.email = decoded.email;

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


 
