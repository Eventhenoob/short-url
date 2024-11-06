import { Router } from "express";
import {
  createShortUrl,
  deleteUrl,
  getUrl,
  updateUrl,
} from "../controllers/url";
import { restrictedToLoggedinUserOnly } from "../middlewares/auth";

const urlRouter = Router();

urlRouter.post("/", restrictedToLoggedinUserOnly, createShortUrl);
urlRouter
  .route("/:shortId")
  .get(getUrl)
  .patch(restrictedToLoggedinUserOnly, updateUrl)
  .delete(restrictedToLoggedinUserOnly, deleteUrl);

export default urlRouter;
