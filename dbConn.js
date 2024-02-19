const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.DBCONN)
    .then(() => console.log("Connected!...."))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connect;
