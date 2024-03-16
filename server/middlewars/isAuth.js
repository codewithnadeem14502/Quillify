import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  let token = "";
  // console.log("Is auth is working ");

  try {
    token = req.cookies["access-token"];
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

  if (!token) {
    return res.status(404).json({ message: "No token, no authorization" });
  }
};

// export const isAuth = (req, res, next) => {
//   const token = req.cookies["access-token"]; // Assuming you're using cookies for token storage
//   console.log("Token :", token);
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     console.log("decoding");
//     const decoded = jwt.verify(token, "secret"); // Make sure to use the same secret key as used for signing
//     console.log("answer ", decoded);
//     // Attach the user object to the request for further usage
//     req.user = decoded;

//     next(); // Move to the next middleware
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };
