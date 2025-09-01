const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

const cookieConfig = {
  sameSite: "none", // in order to response to both first-party and cross-site requests
  secure: "auto", // it should set automatically to secure if is https.
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24,
};

// To get user data on initial page load.
const getUserDataFirst = async (req, res) => {
  try {
    const token = req.cookies.user_token;
    console.log(token);
    if (!token) {
      throw Error("No token found");
    }

    const { _id } = jwt.verify(token, process.env.SECRET);

    const user = await User.findOne({ _id }, { password: 0 });

    console.log(user);

    if (!user) {
      throw Error("Cannot find user");
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signUpUser = async (req, res) => {
  try {
    let userCredentials = req.body;

    const profileImgURL = req?.file?.filename;

    if (profileImgURL) {
      userCredentials = { ...userCredentials, profileImgURL: profileImgURL };
    }

    const user = await User.signup(userCredentials, "user", true);

    const token = createToken(user._id);
    console.log(token);
    res.cookie("user_token", token, cookieConfig);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.cookie("user_token", token, cookieConfig);

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  res.clearCookie("user_token");

  res.status(200).json({ msg: "Logged out Successfully" });
};

const editUser = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    let formData = req.body;

    const profileImgURL = req?.file?.filename;

    if (profileImgURL) {
      formData = { ...formData, profileImgURL: profileImgURL };
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id },
      { $set: { ...formData } },
      { new: true }
    );

    if (!updatedUser) {
      throw Error("No such User");
    }

    const user = await User.findOne({ _id }, { password: 0 });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const token = req.cookies.user_token;

    const { _id } = jwt.verify(token, process.env.SECRET);

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw Error("Invalid ID!!!");
    }

    const { currentPassword, password, passwordAgain } = req.body;

    const user = await User.changePassword(
      _id,
      currentPassword,
      password,
      passwordAgain
    );

    return res.status(200).json({ user, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function signUpSuperAdmin() {
  const userCredentials = {
    firstName: "Super",
    lastName: "Admin",
    email: "admin@gmail.com",
    password: "Admin@123!",
    passwordAgain: "Admin@123!", // Ensure this matches the password
  };

  // const role = "superAdmin"; // Specify the role as superAdmin
  const role = "admin"; // Specify the role as superAdmin
  const isVerified = true; // Set this based on your application's logic

  try {
    const newSuperAdmin = await User.signup(
      userCredentials,
      role,
      isVerified
    );
    console.log("Super Admin created successfully:", newSuperAdmin);
  } catch (error) {
    console.error("Error signing up super admin:", error.message);
  }
}

// // Call the function to sign up the super admin
// signUpSuperAdmin();

module.exports = {
  getUserDataFirst,
  signUpUser,
  loginUser,
  logoutUser,
  editUser,
  changePassword,
};
