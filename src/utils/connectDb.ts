import mongoose from "mongoose";

export default async (url: string) => {
  return await mongoose.connect(url);
};
