import { Schema, model, models } from "mongoose";


const eventSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  detail: { type: String, required: true },
  entrants: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  public_Id: { type: String, required: true },
},
  { timestamps: true }
)


export default models.Event || model("Event", eventSchema);

