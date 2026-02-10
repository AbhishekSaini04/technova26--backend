"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupConfirmationMailTamplate = void 0;
const signupConfirmationMailTamplate = (data) => {
    const { userName, email } = data;
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Technova26</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 15px;">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0f172a; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">
                🎉 Welcome to Technova26
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:25px;">
              <p style="font-size:15px; color:#333;">
                Hello <strong>${userName}</strong>,
              </p>

              <p style="font-size:15px; color:#333;">
                Welcome aboard! 🚀  
                Your account has been successfully created for
                <strong>Technova26</strong>.
              </p>

              <!-- Account Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td colspan="2"
                    style="font-size:16px; font-weight:bold; padding-bottom:10px;">
                    👤 Account Details
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#555;">Registered Email:</td>
                  <td style="padding:6px 0; color:#111;">
                    <strong>${email}</strong>
                  </td>
                </tr>
              </table>

              <p style="font-size:14px; color:#444;">
                You can now log in, explore events, and register for competitions
                happening at <strong>Technova26</strong>.
              </p>

              <p style="font-size:14px; color:#444;">
                Keep an eye on your inbox for important announcements,
                event updates, and instructions.
              </p>

              <p style="font-size:14px; color:#333;">
                We’re excited to have you join us and can’t wait to see you
                at <strong>Technova26</strong>! ✨
              </p>

              <p style="font-size:14px; color:#333;">
                Regards,<br />
                <strong>Technova26 Organizing Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f1f5f9; text-align:center; padding:12px;
              font-size:12px; color:#64748b;">
              © 2026 Technova26 · All Rights Reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
};
exports.signupConfirmationMailTamplate = signupConfirmationMailTamplate;
