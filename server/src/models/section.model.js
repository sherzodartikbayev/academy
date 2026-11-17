import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
  title: { type: String, required: true },
  position: { type: Number },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
});

export default model("Section", sectionSchema);
