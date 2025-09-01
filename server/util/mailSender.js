const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: '"Sagey - Email Verification" <no-reply@sagey.com>', // Sender's email (use your domain's email)
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error.message);
  }
};

// Function to send order notification email
const sendOrderNotification = async (userEmail, orderDetails) => {
  const title = "Order Confirmation - Sagey";
  const body = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
    <style>
      /* Global styles */
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        color: #333;
      }
      h1 {
        font-size: 24px;
        color: #2c3e50;
        margin-bottom: 15px;
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 30px auto;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #2ecc71;
        color: #fff;
        padding: 15px;
        border-radius: 8px 8px 0 0;
      }
      .content {
        padding: 20px;
      }
      .product-info {
        margin-bottom: 20px;
      }
      .product-info h3 {
        font-size: 18px;
        color: #2980b9;
      }
      .product-info p {
        font-size: 16px;
        color: #34495e;
      }
      .product-attributes {
        margin: 10px 0;
      }
      .product-attributes p {
        font-size: 14px;
        color: #7f8c8d;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #95a5a6;
        padding: 10px;
        border-top: 1px solid #ecf0f1;
      }
      .btn {
        display: inline-block;
        background-color: #3498db;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        margin-top: 20px;
      }
      .btn:hover {
        background-color: #2980b9;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h1>Thank You for Your Order!</h1>
      </div>

      <!-- Content -->
      <div class="content">
        <p>Hello <strong>${orderDetails.address.firstName} ${orderDetails.address.lastName}</strong>,</p>
        <p>Thank you for placing your order with us! We are excited to process it and get it to you as soon as possible.</p>

        <div class="product-info">
          <h3>Order Details:</h3>
          <p><strong>Product Price:</strong> ₹${orderDetails.subTotal}</p>
          <div class="product-attributes">
            <p><strong>Color:</strong> ${orderDetails.products[0].attributes?.Color ||  null }</p>
            <p><strong>Quantity:</strong> ${orderDetails.totalQuantity}</p>
          </div>
        </div>

        <p>Your order will reach you by <strong>${new Date(orderDetails.deliveryDate).toLocaleDateString()}</strong>.</p>

        <p>We will process it soon and notify you when it's shipped!</p>

        <p>We appreciate your business!</p>

        <p>If you have any questions, feel free to <a href="mailto:dhaniyeldarvesh26@example.com" class="btn ">Contact Support</a>.</p>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>&copy; 2024 Sagey. All Rights Reserved.</p>
      </div>
    </div>
  </body>
</html>

  `;

  // Call mailSender to send the email
  await mailSender(userEmail, title, body);
};

module.exports = { mailSender, sendOrderNotification };
