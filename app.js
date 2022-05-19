const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const commentRouter = require("./routers/commentRouter");
const indexRouter = require("./routers/indexRouter");
const cookieParser = require("cookie-parser");

app.use("/public", express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use("/post", postRouter);
// app.use("/comment", commentRouter);
app.use("/", indexRouter);

app.listen(process.env.PORT || 4000);
