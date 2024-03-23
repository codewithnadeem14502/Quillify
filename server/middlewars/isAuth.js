import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  let token = "";
  // console.log("is auth ", req.cookies["access-token"]);

  try {
    token = req.cookies["access-token"];
    console.log("Token ", req.headers.authorization);

    if (!token) {
      return res.json({ message: "The Token Is Missing" });
    } else {
      const decoded = jwt.verify(token, "secret");
      // If you need to use the decoded information, you can access it via `decoded`
      req.id = decoded.id;
      req.email = decoded.email;
      req.username = decoded.username;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }

  if (!token) {
    return res.status(401).json({ message: "No token, no authorization" });
  }
};
