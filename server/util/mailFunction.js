const mailSender = require("./mailSender");

// const sendOTPMail = async (email, otp) => {
//   const mailResponse = await mailSender(
//     email,
//     "Email Verification",
//     `<!DOCTYPE html>
//     <html lang="en">
    
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Email Verification</title>
//         <style>
//             body {
//                 font-family: Arial, sans-serif;
//                 background-color: #f4f4f4;
//                 margin: 0;
//                 padding: 0;
//             }

//             h2 {
//               font-weight:500;
//               color: #6b7280;
//             }
    
//             .container {
//                 max-width: 600px;
//                 margin: 0 auto;
//                 background-color: #ffffff;
//                 padding: 40px;
//                 border-radius: 10px;
//                 box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
//             }
    
//             .logo {
//                 display: block;
//                 margin: 0 auto 20px;
//             }
    
//             .header {
//                 background-color: #4caf50;
//                 color: #ffffff;
//                 padding: 10px 20px;
//                 border-radius: 5px;
//                 text-align: left;
//             }
    
//             .otp-content {
//                 margin-top: 30px;
//                 font-size: 18px;
//                 color: #333;
//                 text-align: left;
//                 background-color: #f9f9f9;
//                 border: 1px solid #ddd;
//                 box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
//                 padding: 20px;
//                 border-radius: 5px;
//             }

//             .otp-nb {
//               font-size: 14px;
//             }
    
//             .otp-code {
//                 font-size: 24px;
//                 font-weight: bold;
//                 color: #4caf50;
//             }
    
//             .footer {
//                 margin-top: 30px;
//                 font-size: 14px;
//                 color: #555;
//                 text-align: left;
//             }
//         </style>
//     </head>
    
//     <body>
//         <div className="container">
//             <h2>Sagey.</h2>
//             <div className="header">
//                 <h1>Email Verification</h1>
//             </div>
//             <div className="otp-content">
//                 <p>Dear User,</p>
//                 <p>We have received a request to verify your email address. Please use the following OTP code to complete the verification:</p>
//                 <p><span className="otp-code">${otp}</span></p>
//                 <p className="otp-nb">If you didn't request this OTP, please ignore this email.</p>
//             </div>
//             <div className="footer">
//                 <p>Best regards,</p>
//                 <p>Sagey</p>
//                 <p>&copy; 2023 Sagey. All rights reserved.</p>
//             </div>
//         </div>
//     </body>
    
//     </html>
    
//     `
//   );
//   console.log("Email sent successfully: ", mailResponse);
// };

const passwordChangedMail = async (email, otp) => {
    try {
      const mailResponse = await mailSender(
        email,
        "Password Reset OTP",
        `
        <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            h2 {
              font-weight:500;
              color: #6b7280;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
            }
    
            .logo {
                display: block;
                margin: 0 auto 20px;
            }
    
            .header {
                background-color: #4caf50;
                color: #ffffff;
                padding: 10px 20px;
                border-radius: 5px;
                text-align: left;
            }
    
            .otp-content {
                margin-top: 30px;
                font-size: 18px;
                color: #333;
                text-align: left;
                background-color: #f9f9f9;
                border: 1px solid #ddd;
                box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 5px;
            }

            .otp-nb {
              font-size: 14px;
            }
    
            .otp-code {
                font-size: 24px;
                font-weight: bold;
                color: #4caf50;
            }
    
            .footer {
                margin-top: 30px;
                font-size: 14px;
                color: #555;
                text-align: left;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h2>Sagey.</h2>
            <div class="header">
                <h1>Password Reset OTP</h1>
            </div>
            <div class="otp-content">
                <p>Dear User,</p>
                <p>We have received a request to reset your password. Please use the following OTP to proceed with the reset:</p>
                <p><span class="otp-code">${otp}</span></p>
                <p class="otp-nb">This OTP will expire in 10 minutes. Please do not share it with anyone. If you didn't request this, please ignore this email.</p>
            </div>
            <div class="footer">
                <p>Best regards,</p>
                <p>Sagey</p>
                <p>&copy; 2023 Sagey. All rights reserved.</p>
            </div>
        </div>
    </body>
    
    </html>
    `
      );
  
      // Check if the response is valid or not
      console.log("Email sent response: ", mailResponse);
      return mailResponse; // Return the response from mailSender
    } catch (error) {
      console.error("Error sending email: ", error);
      throw new Error("Failed to send email. Please try again.");
    }
  };  

module.exports = { passwordChangedMail };
