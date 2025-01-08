import { model, Schema, Types } from "mongoose";

const schema = new Schema(
  {
    employee: {
      
      type: Types.ObjectId,
      ref: "Employee",
    },
    date: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

export const Attendance = model("Attendance", schema);
