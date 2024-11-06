import { NextFunction, Request, Response } from "express";
import { getAuth } from "../utils/sessionMap";
import userModel from "../models/user";

export const restrictedToLoggedinUserOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userUid = req.cookies.uid;
  if (!userUid) {
    res.redirect("/login");
    return;
  }

  const userId = getAuth(userUid);
  if (!userId) {
    res.redirect("/login");
    return;
  }

  const foundUser = await userModel.findById(userId);
  if (!foundUser) {
    res.redirect("/login");
    return;
  }

  req.user = {
    _id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
    password: foundUser.password,
  };

  next();
  return;
};

export const checkUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userUid = req.cookies.uid;
  if (!userUid) {
    next();
    return;
  }

  const userId = getAuth(userUid);
  if (!userId) {
    next();
    return;
  }

  const foundUser = await userModel.findById(userId);
  if (!foundUser) {
    next();
    return;
  }

  req.user = {
    _id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
    password: foundUser.password,
  };

  next();
  return;
};
