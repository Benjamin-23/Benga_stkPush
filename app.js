const express = require("express");
const router = require("./routes/mpesa.js");


// const mpesaRouter = require("./routes/mpesa");
const app = express();
const port = process.env.PORT || 3000;

// app.set("view engine", "ejs");
// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/mpesa", router);

// app.use(function (req, res, next) {
//   next(createError(404));
// });
// error handler
// app.use(function (err, req, res, next) {
// set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get("env") === "development" ? err : {};

// render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
app.listen(port, () => {
  // server started
  console.log("Server started");
});
