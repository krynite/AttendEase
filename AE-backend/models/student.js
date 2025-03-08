const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentsSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    studentIc: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    enrollStatus: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
    },
    scfaStatus: {
      type: String,
      required: true,
      enum: [
        "active-beneficiary",
        "non-beneficiary",
        "former-beneficiary",
        "pending",
        "denied",
      ],
    },
  },
  { timestamps: true }
);

module.exports = model("Student", studentsSchema);
