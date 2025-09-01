import React, { useState } from "react";
// import ForgotBG from "../../assets/forggotpassb.jpg";
import ForgotBG from "../../assets/Sagey/forgotps.jpeg";
import Logo from "../../assets/Sagey/sage-logo.png";
import { Link } from "react-router-dom";

import OTPEmailSection from "./components/OTPEmailSection";
import OTPEnterSection from "./components/OTPEnterSection";
import PasswordEnterSection from "./components/PasswordEnterSection";
import OTPExpired from "./components/OTPExpired";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSec, setEmailSec] = useState(true);
  const [otpSec, setOTPSec] = useState(false);
  const [passwordSec, setPasswordSec] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);
  const [otpExpired, setOTPExpired] = useState(false);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-50">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center opacity-30"
    style={{ backgroundImage: `url(${ForgotBG})` }}
  ></div>

  {/* Centered Form */}
  <div className="relative w-full flex items-center justify-center px-6 py-12 lg:px-16">
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <img src={Logo} alt="Helah Logo" className="w-24" />
        {/* <p className="text-3xl font-bold ml-2">Helah.</p> */}
      </div>
      <h1 className="text-2xl font-bold mb-2 text-center">Reset your Password</h1>

      {/* Form Sections */}
      {emailSec && (
        <OTPEmailSection
          setEmailSec={setEmailSec}
          setOTPSec={setOTPSec}
          email={email}
          setEmail={setEmail}
        />
      )}
      {otpSec && (
        <OTPEnterSection
          email={email}
          setOTPSec={setOTPSec}
          setPasswordSec={setPasswordSec}
          setOTPExpired={setOTPExpired}
        />
      )}
      {passwordSec && (
        <PasswordEnterSection
          email={email}
          setFinalMessage={setFinalMessage}
          setPasswordSec={setPasswordSec}
        />
      )}
      {finalMessage && (
        <div className="flex justify-center items-center flex-col">
          <h1 className="my-2 text-center">
            Your password has been reset, please login again
          </h1>
          <Link
            className="w-fit bg-black text-white py-2 px-4 rounded-lg text-center"
            to="/login"
          >
            Go to Login
          </Link>
        </div>
      )}
      {otpExpired && <OTPExpired />}
    </div>
  </div>
</div>

  );
};

export default ForgetPassword;
