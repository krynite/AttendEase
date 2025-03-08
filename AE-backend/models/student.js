const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentsSchema = new Schema(
  {
    enrollStatus: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
    },
    enrollDate: {
      type: Date,
      required: true,
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
    role: {
      type: String,
      required: true,
      enum: ["student"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["m", "male", "f", "female"],
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
  },
  { timestamps: true }
);

module.exports = model("Student", studentsSchema);
