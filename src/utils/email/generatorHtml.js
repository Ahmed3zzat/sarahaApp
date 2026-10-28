export const signUp = (verificationUrl) => `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Welcome to Saraha</title>

    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            background-color: #f4f7f9;
            font-family: Arial, Helvetica, sans-serif;
            color: #1f2937;
        }

        .email-wrapper {
            width: 100%;
            padding: 40px 20px;
        }

        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .header {
            background: linear-gradient(135deg, #16a34a, #15803d);
            padding: 35px 30px;
            text-align: center;
            color: #ffffff;
        }

        .logo {
            font-size: 32px;
            font-weight: bold;
            margin: 0 0 8px;
        }

        .header-text {
            margin: 0;
            font-size: 15px;
            opacity: 0.9;
        }

        .content {
            padding: 40px 35px;
        }

        .title {
            margin: 0 0 20px;
            font-size: 26px;
            color: #111827;
        }

        .text {
            margin: 0 0 18px;
            font-size: 16px;
            line-height: 1.7;
            color: #4b5563;
        }

        .otp-box {
            margin: 30px 0;
            padding: 22px;
            background-color: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            text-align: center;
        }

        .otp-label {
            margin: 0 0 10px;
            font-size: 14px;
            color: #6b7280;
        }

        .otp {
            margin: 0;
            font-size: 34px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #15803d;
        }

        .button-wrapper {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            display: inline-block;
            padding: 14px 28px;
            background-color: #16a34a;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-size: 15px;
            font-weight: bold;
        }

        .warning {
            margin-top: 25px;
            padding: 15px;
            background-color: #fff7ed;
            border-left: 4px solid #f97316;
            color: #7c2d12;
            font-size: 14px;
            line-height: 1.6;
        }

        .footer {
            padding: 25px 30px;
            background-color: #f9fafb;
            text-align: center;
            border-top: 1px solid #e5e7eb;
        }

        .footer-text {
            margin: 0;
            font-size: 13px;
            line-height: 1.6;
            color: #9ca3af;
        }

        .footer-link {
            color: #16a34a;
            text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 20px 10px;
            }

            .content {
                padding: 30px 20px;
            }

            .header {
                padding: 30px 20px;
            }

            .title {
                font-size: 23px;
            }

            .otp {
                font-size: 28px;
                letter-spacing: 5px;
            }
        }
    </style>
</head>

<body>

    <div class="email-wrapper">

        <div class="email-container">

            <!-- Header -->
            <div class="header">
                <h1 class="logo">Saraha</h1>

                <p class="header-text">
                    Welcome to our platform
                </p>
            </div>

            <!-- Content -->
            <div class="content">

                <h2 class="title">
                    Welcome, Ahmed! 👋
                </h2>

                <p class="text">
                    Thank you for creating an account with
                    <strong>Saraha</strong>.
                </p>

                <p class="text">
                    We're happy to have you with us.
                    Please use the verification code below to verify your email address.
                </p>

                <!-- OTP -->
                <div class="otp-box">

                    <p class="otp-label">
                        Your verification code
                    </p>

                    <p class="otp">
                        583291
                    </p>

                </div>

                <p class="text">
                    This verification code will expire in
                    <strong>10 minutes</strong>.
                </p>

                <!-- Button -->
                <div class="button-wrapper">

                    <a href=${verificationUrl} class="button">
                        Verify My Email
                    </a>

                </div>

                <!-- Warning -->
                <div class="warning">
                    <strong>Security notice:</strong>
                    If you didn't create this account, you can safely ignore this email.
                    Never share your verification code with anyone.
                </div>

            </div>

            <!-- Footer -->
            <div class="footer">

                <p class="footer-text">
                    © 2026 Saraha. All rights reserved.
                </p>

                <p class="footer-text">
                    This is an automated email. Please do not reply to this message.
                </p>

            </div>

        </div>

    </div>

</body>

</html>`;
