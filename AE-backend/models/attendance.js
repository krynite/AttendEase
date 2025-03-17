const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { schema: attendanceRecordsSchema } = require("./attendanceRecords");

const attendanceSchema = new Schema(
  {
    attendanceName: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    attendanceDate: {
      type: Date,
      required: true,
    },
    attendanceRecords: [attendanceRecordsSchema],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = model("Attendance", attendanceSchema);
