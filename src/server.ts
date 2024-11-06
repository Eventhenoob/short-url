import express from "express";
import connectDb from "./utils/connectDb";
import urlRouter from "./routes/url";
import redirectRouter from "./routes/redirect";
import analyticesRouter from "./routes/analytices";
import urlModel from "./models/url";
import path from "path";
import staticRouter from "./routes/static";
import userRouter from "./routes/user";
import cookieParser from "cookie-parser";
connectDb("mongodb://localhost:27017/shortUrl")
  .then(() => console.log("db connected successfully"))
  .catch(() => console.log("fail to connect db"));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/api/v1/url", urlRouter);
app.use("/api/v1/analytics", analyticesRouter);
app.use("/redirect", redirectRouter);
app.use("/user", userRouter);

app.use("/", staticRouter);
export default app;
