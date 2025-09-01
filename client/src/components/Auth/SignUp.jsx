import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVerified } from "@/redux/reducers/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isVerified = useSelector((state) => state.user.isVerified);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // If user is already verified, redirect immediately
    if (isVerified) {
      navigate("/register");
      return;
    }

    // Check if script is already loaded
    if (document.getElementById('otpless-script')) {
      setScriptLoaded(true);
      return;
    }

    // Dynamically load OTPless script
    const script = document.createElement('script');
    script.id = 'otpless-script';
    script.src = "https://otpless.com/v2/auth.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [dispatch, navigate, isVerified]);

  useEffect(() => {
    // Only set up OTPless when script is loaded
    if (scriptLoaded) {
      window.otpless = (otplessUser) => {
        console.log(otplessUser);
        if (otplessUser && otplessUser.status === "SUCCESS") {
          dispatch(setVerified());
          const identityValue = otplessUser.identities[0]?.identityValue;
          console.log(identityValue);
        }
      };

      // Ensure OTPless widget is initialized
      setTimeout(() => {
        if (window.OTPless) {
          window.OTPless.render();
        }
      }, 100);
    }
  }, [scriptLoaded, dispatch]);

  return (
    <div className="my-40 shadow-none">
      <div id="otpless-login-page"></div>
    </div>
  );
};

export default SignUp;