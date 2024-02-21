// const nodemailer = require("nodemailer");
// const mg = require("nodemailer-mailgun-transport");

// const sendMail = (option) => {
//   const auth = {
//     auth: {
//       api_key: "key-d7ffb75f5e6227c03dc1bf5c06be3888-408f32f3-4cb2b3cb",
//       domain: "sandboxc15435ec67f04e02b43bcef82f82ad60.mailgun.org",
//       port: "587",
//       hostname: "smtp.mailgun.org",
//     },
//   };

//   const nodemailerMailgun = nodemailer.createTransport(mg(auth));

//   const mailOption = {
//     from: "brad@sandboxc15435ec67f04e02b43bcef82f82ad60.mailgun.org ",
//     to: "a.diaa.khabeer@gmail.com",
//     subject: option.subject,
//     text: option.message,
//   };
//   try {
//     nodemailerMailgun.sendMail(mailOption);
//     console.log(`Response:`);
//   } catch (err) {
//     console.log(`Error: ${err}`);
//   }
// };
// module.exports = sendMail;
// const nodemailer = require("nodemailer");
// const sendMail = (option) => {
//   var transporter = nodemailer.createTransport({
//     port: 465,
//     secure: true,

//     service: "gmail",
//     host: "smtp.gmail.com",
//     auth: {
//       user: "dyaaabdelrahman5@gmail.com",
//       pass: "pass123456789adminleader",
//     },
//   });
//   const mailOption = {
//     from: "Anguler Project <Abdelrhman Dyaa>",
//     to: option.email,
//     subject: option.subject,
//     text: option.message,
//   };
//   transporter.sendMail(mailOption);
// };
// module.exports = sendMail;

nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const clintId =
  "265603483745-tb9esfr1kosa3mamlll1sojp044kla9p.apps.googleusercontent.com";
const clintSecrt = "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";
const refresh_Token =
  "1//048_WCLX7rIqlCgYIARAAGAQSNwF-L9IrWxjFuOwQcWh8FwTo4q2lgKQoFEF8sScvTC3-wOkzbMBPz4rWZ07aUHMdOB5WydDwgj4";

const oAuth2 = google.auth.oAuth2;
const oAuth2_clint = new oAuth2(clintId, clintSecrt);
oAuth2_clint.setCredentials({ refresh_token: refresh_Token });

const sendEmail = (options) => {
  const accsessToken = oAuth2_clint.getAccsessToken();
  const transporter = nodemailer.createTransport({
    service: "google",
    auth: {
      type: "OAuth2",
      user: "",
      clintId: "",
      clintSecrt: "",
    },
  });
};
