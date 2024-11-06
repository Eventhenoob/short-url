import { Request, Response } from "express";
 import urlModel from "../models/url";

 export const getAnalyticsByShortId = async (req: Request, res: Response) => {
  const shortId = req.params.shortId;
  const foundShortLink = await urlModel.findOne({ shortId });

  if (!foundShortLink) {
    res.status(404).json({ message: "No short url found" });
    return;
  }

  res.json({
    totalClicks: foundShortLink.clicks.length,
    analytics: foundShortLink.clicks,
  });

  return;
};
