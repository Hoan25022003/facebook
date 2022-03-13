const express = require("express");
const app = express();
const userRouter = require("./router/userRouter");
const indexRouter = require("./router/indexRouter");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use("/user", userRouter);
app.use("/", indexRouter);

app.listen(4000);
