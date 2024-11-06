import { Router } from "express";
import urlModel from "../models/url";
import { checkUser } from "../middlewares/auth";
import userModel from "../models/user";
const staticRouter = Router();

staticRouter.get("/", checkUser, async (req, res) => {
  if (!req.user) {
    res.redirect("/login");
    return;
  }

  const allUrl = await urlModel.find({ createdBy: req.user._id });
  res.render("home", {
    allUrls: allUrl,
  });
  return;
});

staticRouter.get("/signup", async (req, res) => {
  res.render("signup");
  return;
});

staticRouter.get("/login", async (req, res) => {
  res.render("login");
  return;
});

export default staticRouter;
