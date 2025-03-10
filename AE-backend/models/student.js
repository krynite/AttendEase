const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentsSchema = new mongoose.Schema(
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
    studentName: {
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
    gender: {
      type: String,
      required: true,
      enum: ["m", "male", "f", "female"],
    },
    address: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
    },
    schoolNumber: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Student", studentsSchema);
