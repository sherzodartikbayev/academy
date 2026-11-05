import { model, Schema } from "mongoose";

const imageSchema = new Schema({
  url: { type: String, required: true },
  key: { type: String, required: true },
});

export default model("Image", imageSchema);
