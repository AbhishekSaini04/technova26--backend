export const otpEmailTemplate = (otp: string, name?: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TechNova26 OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#0f172a; padding:20px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px;">
                TechNova<span style="color:#38bdf8;">26</span>
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px; color:#111827;">
              <p style="font-size:16px; margin:0 0 10px;">
                Hello${name ? ` ${name}` : ""}, 👋
              </p>

              <p style="font-size:14px; line-height:1.6;">
                Use the following One-Time Password (OTP) to verify your email address for <strong>TechNova26</strong>.
                This OTP is valid for <strong>10 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="margin:30px 0; text-align:center;">
                <span style="
                  display:inline-block;
                  padding:14px 28px;
                  font-size:24px;
                  letter-spacing:6px;
                  font-weight:bold;
                  background:#f1f5f9;
                  color:#0f172a;
                  border-radius:6px;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:13px; color:#6b7280;">
                If you did not request this OTP, please ignore this email.
              </p>

              <p style="font-size:13px; color:#6b7280; margin-top:20px;">
                — Team TechNova26
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#9ca3af;">
              © 2026 TechNova. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
