const path = require("path");

const express = require("express");
const morgan = require("morgan");

const db = require("./config/db");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errMiddleware");

const dotenv = require("dotenv").config(".env");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true })); // For form data

db();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);
const port = process.env.port || 8000;

const server = app.listen(port, () => {
  console.log(`App is listening at port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejectionErrors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shutting Down...");
    process.exit(1);
  });
});
