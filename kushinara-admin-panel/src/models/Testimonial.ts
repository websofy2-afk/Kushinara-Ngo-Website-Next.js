import { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true },
    public_Id: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Testimonial || model("Testimonial", testimonialSchema);

