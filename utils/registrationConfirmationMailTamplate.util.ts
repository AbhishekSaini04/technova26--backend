interface RegistrationMailData {
  userName: string;
  eventName: string;
  eventDateTime: string;
  eventVenue: string;
  teamMembers: {
    name: string;
    email: string;
  }[];
}

export const registrationConfirmationMail = (
  data: RegistrationMailData
): string => {
  let { userName, eventName, eventDateTime, eventVenue, teamMembers } = data;
if (!teamMembers) {
    teamMembers = [];
  }
  const teamDetailsHtml = teamMembers
    .map(
      (member, index) =>
        `<tr>
          <td style="padding:6px 0; font-size:14px; color:#333;">
            ${index + 1}. ${member.name} (${member.email})
          </td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Technova26 Registration Confirmation</title>
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
                🎉 Technova26 Registration Confirmed
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
                Congratulations! 🎊  
                You have successfully registered for the event
                <strong>${eventName}</strong> at <strong>Technova26</strong>.
              </p>

              <!-- Event Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td colspan="2" style="font-size:16px; font-weight:bold; padding-bottom:10px;">
                    📅 Event Details
                  </td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#555;">Date & Time:</td>
                  <td style="padding:6px 0; color:#111;"><strong>${eventDateTime}</strong></td>
                </tr>
                <tr>
                  <td style="padding:6px 0; color:#555;">Venue:</td>
                  <td style="padding:6px 0; color:#111;"><strong>${eventVenue}</strong></td>
                </tr>
              </table>

           ${teamMembers.length > 1 ? `
  <!-- Team Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;">
                <tr>
                  <td style="font-size:16px; font-weight:bold; padding-bottom:10px;">
                    👥 Team Details
                  </td>
                </tr>
                ${teamDetailsHtml}
              </table>` : ''}

              <p style="font-size:14px; color:#444;">
                Please ensure that all team members report to the venue on time.
                Any further instructions will be shared via email.
              </p>

              <p style="font-size:14px; color:#444;">
                We’re excited to have you at <strong>Technova26</strong> and wish you the best! 🚀
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
