import { Request, Response } from "express";
import userModel from "../models/user";
import UIDGenerator from "uid-generator";
import { setAuth } from "../utils/sessionMap";

const uidGenerator = new UIDGenerator();
export const handleUserSingup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const newUser = await userModel.create({ name, email, password });
  const sessionId = await uidGenerator.generate();
  const token = setAuth({
    _id: newUser.id,
    email: newUser.email,
    name: newUser.email,
  });
  res.cookie("uid", token);
  res.redirect("/");
  return;
};

export const handleUserLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const foundUser = await userModel.findOne({ email, password });

  if (!foundUser) {
    res.render("login", {
      error: "Invalid Creds Provired",
    });
    return;
  }
  const sessionId = await uidGenerator.generate();
  const token = setAuth({
    _id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
  });
  res.cookie("uid", token);
  res.redirect("/");
  return;
};
