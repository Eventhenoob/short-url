import { Request, Response } from "express";
import UIDGenerator from "uid-generator";
import urlModel from "../models/url";

const uidgen = new UIDGenerator();
export const createShortUrl = async (req: Request, res: Response) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({
      message: "Please Provide a URL",
    });
    return;
  }

  const uid = await uidgen.generate();

  await urlModel.create({
    createdBy: req.user!._id,
    shortId: uid,
    orginalUrl: url,
  });

  res.render("home", {
    shortId: uid,
  });
  return;

  // res.status(201).json({
  //   shortUrl: `${req.headers.host}/redirect/${uid}`,
  // });
};

export const getUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;
  const foundUrl = await urlModel.findOne({ shortId }).select("-clicks");
  if (!foundUrl) {
    res.status(404).json({ message: "Invalid Short Id provided" });
    return;
  }

  res.status(200).json({
    data: foundUrl,
  });
  return;
};

export const updateUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;
  const newUrl = req.body.url;

  const foundUrl = await urlModel.findOneAndUpdate(
    { shortId },
    { orginalUrl: newUrl }
  );
  if (!foundUrl) {
    res.status(404).json({ message: "Invalid Short Id provided" });
    return;
  }

  res.json({ message: "Url updated successfully" });
};

export const deleteUrl = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;
  await urlModel.findOneAndDelete({ shortId });
  res.status(200).json({ message: "Url deleted successfully" });
};
