import { Schema, model, models } from "mongoose";

const newsSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    summary: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image_public_Id: { type: String, required: true },
    thumbnail_public_Id: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.News || model("News", newsSchema);

