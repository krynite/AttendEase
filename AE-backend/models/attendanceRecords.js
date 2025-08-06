const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const scanEventSchema = new Schema({
  time: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const attendanceRecordsSchema = new Schema(
  {
    timeIn: {
      type: Date,
      required: true,
    },
    timeOut: {
      type: Date,
      required: false,
    },
    //   timeDuration: {      //! Testing virtual below (works)
    //     type: Number,
    //     required: true,
    //     default: 0,
    //   },
    requirementsMet: {
      type: String,
      enum: ["NA", "true", "false"], // NA for those not SCFA
      default: "NA",

    },
    //* NEW scanEvents
    scanEvents: [scanEventSchema]
    
    // {
    //   time: Date,
    //   createdAt: {
    //     type: Date,
    //     default: Date.now,
    //   },
    // },
    // #region //*OLD scanEvents
    // [
    //   {
    //     time: {
    //       type: Date,
    //       required: true,
    //     }
    //   }
    // ],
    // #endregion
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

attendanceRecordsSchema.virtual("timeDuration").get(function () {
  if (this.timeIn && this.timeOut) {
    return Math.abs(this.timeOut - this.timeIn);
  }
  return null;
});

const RecordsModel = model("Records", attendanceRecordsSchema);

// (OPTIONAL) Can write another virtual. If timeIn === timeOut, return "student forgot to sign out".

module.exports = {
  schema: attendanceRecordsSchema,
  model: RecordsModel,
};
