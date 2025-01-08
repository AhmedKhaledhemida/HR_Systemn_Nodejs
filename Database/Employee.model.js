import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const schema = new Schema(
  {
    name: { type: String},
    email: { type: String, required: true },
    password: { type: String },
    group: {
      type: String,
      enum: ["HR", "Normal Employee"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
// To encrypt the password
schema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 8);
});

schema.pre("findOneAndUpdate", function () {
  if (this._update.password)
    this._update.password = bcrypt.hashSync(this._update.password, 8);
});

export const Employee = model("Employee", schema);
