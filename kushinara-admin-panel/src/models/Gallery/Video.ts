import { Schema, model, models } from "mongoose";


const videoSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  video: { type: String, required: true },
},
  { timestamps: true }
)

export default models.Video || model("Video", videoSchema);

