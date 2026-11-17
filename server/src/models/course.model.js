import { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    level: { type: String, required: true },
    category: { type: String, required: true },
    excerpt: { type: String },
    forWhom: { type: String },
    whatYouWillLearn: { type: String },
    keywords: { type: String },
    isPublished: { type: Boolean, default: false },
    type: { type: String, enum: ["course", "project"], required: true },
  },
  { timestamps: true },
);

export default model("Course", courseSchema);
