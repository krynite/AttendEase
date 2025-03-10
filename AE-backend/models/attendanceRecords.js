const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const attendanceRecordsSchema = new Schema({
  timeIn: {
    type: Date,
    required: true,
  },
  timeOut: {
    type: Date,
    required: true,
  },
  timeDuration: {
    type: Number,
    required: true,
    default: 0,
  },
  requirementsMet: {
    type: String,
    enum: ["NA", "true", "false"], // NA for those not SCFA
    default: "NA",
    // type: Number,
    // default: 0,
  },
});

module.exports = model("Records", attendanceRecordsSchema);
