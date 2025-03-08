const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const caretakerSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    careTakerIc: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Caretaker", caretakerSchema);

// requester: { type: Schema.Types.ObjectId, ref: "User", required: true },
// recipient: { type: Schema.Types.ObjectId, ref: "User", required: true },
// status: {
//   type: String,
//   enum: ["pending", "accepted", "declined"],
//   default: "pending",
// },
