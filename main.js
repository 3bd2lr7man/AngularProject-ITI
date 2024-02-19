const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const cors = require("cors");
app.use(cors());
const morgan = require("morgan");
const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRouter");
const ApiError = require("./utiles/apiError");
const globalError = require("./middlewares/errorMiddleware");
const categoryroute = require("./routes/categoryroute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandroute");

const DB = require("./dbConn");
app.use(express.json());
app.use(morgan("dev"));
DB();
//
// app.use("/", (req, res) => {
//   return res.status(200).json({
//     message: "صباحو يرجالة السيرفر شغال تمام ولعو الدنيا",
//   });
// });
//
app.use("/api/v1/users", userRouter);
//
app.use("/api/v1/admin", adminRouter);
//
app.use("/api/v1/categories", categoryroute);
//
app.use("/api/v1/subcategories", subCategoryRoute);
//
app.use("/api/v1/brands", brandRoute);
//
app.all("*", (req, res, next) => {
  next(new ApiError(`cant find this route: ${req.originalUrl}`, 404));
});

app.use(globalError);

const port = process.env.PORT;
app.listen(port, () => console.log(`server running on port  ${port}...!`));
