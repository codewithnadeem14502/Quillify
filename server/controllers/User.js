import UserModal from "../modals/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModal.findOne({ username });

  if (!user) {
    return res.json({ message: "User Don't Exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, message: "Login Successfully" });
};

export const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await UserModal.findOne({ email });
    if (user) return res.json({ message: "User Already Exist's" });

    const hashedpassword = await bcrypt.hash(password, 10);
    user = await UserModal.create({
      username,
      email,
      password: hashedpassword,
    });

    res.json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const Logout = (req, res) => {
  res.clearCookie("access-token");

  res.json({ message: "Logout Successful" });
};
