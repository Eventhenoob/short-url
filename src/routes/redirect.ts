import { Router } from "express";
import urlModel from "../models/url";
const redirectRouter = Router();

redirectRouter.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const foundUrlEntry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        clicks: { timestamp: Date.now() },
      },
    }
  );
  if (!foundUrlEntry) {
    res.status(404).json({ message: "Url not found" });
    return;
  }
  res.redirect(foundUrlEntry.orginalUrl);
  return;
});

export default redirectRouter;
