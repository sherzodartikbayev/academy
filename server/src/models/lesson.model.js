import { Schema, model } from "mongoose";

const lessonSchema = new Schema({
  title: { type: String, required: true },
  position: { type: Number },
  content: { type: String },
  videoId: { type: String },
  hours: { type: Number },
  minutes: { type: Number },
  sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
});

export default model("Lesson", lessonSchema);
