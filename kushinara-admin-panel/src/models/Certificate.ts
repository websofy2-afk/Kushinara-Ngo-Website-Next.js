import { Schema, model, models } from "mongoose";

const CertificateSchema = new Schema({
  title: { type: String, required: true },
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default models.Certificate || model("Certificate", CertificateSchema);