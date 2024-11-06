import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    orginalUrl: {
      type: String,
      required: true,
    },
    clicks: {
      type: [{ timestamp: Number }],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const urlModel = mongoose.model("ShortUrl", urlSchema);
export default urlModel;
