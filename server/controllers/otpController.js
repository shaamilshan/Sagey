const User = require("../model/userModel");
const OTP = require("../model/otpModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { passwordChangedMail } = require("../util/mailFunction");
const mailSender = require("../util/mailSender")
// Sending OTP to email for validation
// const sendOTP = async (req, res) => {
//   // console.log("Sending OTP  to email for validation", req.body);
//   try {
//     const { email } = req.body;
//     if (!email) {
//       throw Error("Provide an Email");
//     }

//     if (!validator.isEmail(email)) {
//       throw Error("Invalid Email");
//     }

//     const user = await User.findOne({ email });

//     if (user) {
//       throw Error("Email is already registered");
//     }

//     let otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

//     const exists = await OTP.findOne({ email });

//     if (exists) {
//       throw Error("OTP already send");
//     }

//     await OTP.create({ email, otp });

//     res.status(200).json({ success: true, message: "OTP sent Successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Validating above OTP
// const validateOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const data = await OTP.findOne({ email });

//     if (!data) {
//       throw Error("OTP expired");
//     }

//     if (otp !== data.otp) {
//       throw Error("OTP is not matched");
//     }

//     res.status(200).json({
//       success: true,
//       message: "OTP validation Success",
//     });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) throw Error("Provide an Email");
    if (!validator.isEmail(email)) throw Error("Invalid Email");

    const user = await User.findOne({ email });
    if (!user) throw Error("Email is not Registered");

    // Generate OTP
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const expiryTime = Date.now() + 10 * 60 * 1000;

    const otpExists = await OTP.findOne({ email });
    if (otpExists) await OTP.findOneAndDelete({ _id: otpExists._id });

    // Save OTP to the database
    await OTP.create({ email, otp, expiresAt: expiryTime });

    // Send the OTP to the user
    const emailResponse = await passwordChangedMail(email, otp);  // Pass OTP to the function
    console.log("Email sent successfully: ", emailResponse); // Log the response

    if (!emailResponse) {
      throw Error("Failed to send email. Please try again.");
    }

    res.status(200).json({ msg: "OTP is sent to your email address", success: true });
  } catch (error) {
    console.error("Error in forgotPassword: ", error.message);
    res.status(400).json({ error: error.message });
  }
};



// Validating forgot OTP
const validateForgotOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw Error("Email is not Registered");
    }

    const validOTP = await OTP.findOne({ email });

    if (otp !== validOTP.otp) {
      throw Error("Wrong OTP. Please Check again");
    }

    res.status(200).json({ success: true, message: "OTP validation Success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Setting up new password
const newPassword = async (req, res) => {
  try {
    const { email, password, passwordAgain } = req.body;

    if (!email || !password || !passwordAgain) {
      throw Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    if (password !== passwordAgain) {
      throw Error("Passwords are not same");
    }

    const oldUserData = await User.findOne({ email });

    const match = await bcrypt.compare(password, oldUserData.password);

    if (match) {
      throw Error("Provide new Password");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          password: hash,
        },
      }
    );

    if (user) {
      try {
        passwordChangedMail(email);
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Resending OTP incase the user doesn't receive the OTP
const resentOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw Error("Email is required");
    }

    if (!validator.isEmail(email)) {
      throw Error("Invalid Email");
    }

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      throw Error("No OTP found in this email. Try again...");
    }

    if (otpData.otp) {
      passwordChangedMail(email, otpData.otp);
    } else {
      throw Error("Cannot find OTP");
    }

    res.status(200).json({ message: "OTP resend successfully", success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  forgotPassword,
  validateForgotOTP,
  newPassword,
  resentOTP,
};
