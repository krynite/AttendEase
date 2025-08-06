const mongoose = require("mongoose");
const { Schema } = mongoose;
const { schema: attendanceRecordsSchema } = require("./attendanceRecords");


// add comment to attendance document. 
const attendanceCommentsSchema = new Schema(
  {
    author: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }

)

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
    //* For now use Embedded attendanceRecordsSchema  || Future try Referenced. For larger and easier retrieval and analytics if needed. 
    attendanceRecords: attendanceRecordsSchema,
    // embeded comments to attendance documents
    comments: [attendanceCommentsSchema]
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false, // Don't generate an id virtual
  }
);




const AttendanceModel = mongoose.model("Attendance", attendanceSchema);
module.exports = AttendanceModel;


