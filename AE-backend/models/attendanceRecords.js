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
  //   timeDuration: {      //! Testing virtual below
  //     type: Number,
  //     required: true,
  //     default: 0,
  //   },
  requirementsMet: {
    type: String,
    enum: ["NA", "true", "false"], // NA for those not SCFA
    default: "NA",
    // type: Number,
    // default: 0,
  },
});

attendanceRecordsSchema.virtual("timeDuration").get(function () {
  if (this.timeIn && this.timeOut) {
    return Math.abs(this.timeOut - this.timeIn);
  }
});

module.exports = model("Records", attendanceRecordsSchema);
