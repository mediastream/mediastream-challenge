import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// const mongoose = require('mongoose');
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
// });

// TODO: add uniqueness and email validations to email field
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

schema.plugin(uniqueValidator, { message: "This email is already taken" });

export default mongoose.model("User", schema);
