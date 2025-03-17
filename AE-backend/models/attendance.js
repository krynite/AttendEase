const mongoose = require("mongoose");
const { Schema } = mongoose;
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
    id: false, // Don't generate an id virtual
  }
);

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
module.exports = AttendanceModel;
