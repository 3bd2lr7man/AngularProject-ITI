nodemailer = require("nodemailer");
const { google } = require("googleapis");
const clintId =
  "265603483745-tb9esfr1kosa3mamlll1sojp044kla9p.apps.googleusercontent.com";
const clintSecrt = "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";
const refresh_Token =
  "1//048_WCLX7rIqlCgYIARAAGAQSNwF-L9IrWxjFuOwQcWh8FwTo4q2lgKQoFEF8sScvTC3-wOkzbMBPz4rWZ07aUHMdOB5WydDwgj4";

const OAuth2 = google.auth.OAuth2;
const oAuth2_clint = new OAuth2(clintId, clintSecrt);
oAuth2_clint.setCredentials({ refresh_token: refresh_Token });

const sendEmail = (options) => {
  const accessToken = oAuth2_clint.getAccessToken();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "oAuth2",
      user: "dyaaabdelrahman5@gmail.com",
      clientId: clintId,
      clientSecret: clintSecrt,
      refreshToken: refresh_Token,
      accessToken: accessToken,
    },
  });
  const mailOption = {
    from: "Anguler Project <Abdelrhman>",
    to: options.to,
    subject: options.subject,
    text: options.message,
  };
  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
  transporter.close();
};
module.exports = sendEmail;
