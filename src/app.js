require("dotenv").config();
const express = require("express");
const path = require("path");
const appRouter = require("./routers/appRoutes");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw Error;
  }
  console.log(`App running on port ${PORT}`);
});
