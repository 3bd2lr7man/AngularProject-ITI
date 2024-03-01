const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dyq2a45o2",
  api_key: "432156448821226",
  api_secret: "fcojD-GI5H7GkMvHWLlWQ_YfAkY",
});

exports.uploads = (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url, id: result.public_id });
      },
      { resource_type: "auto" }
    );
  });
};
