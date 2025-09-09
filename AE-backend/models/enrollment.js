const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const enrollmentSchema = new Schema({
  enrollmentName: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  enrollmentData: {
    type: Array,


    
    
  },
});

const EnrollmentModel = model("Enrollment", enrollmentSchema);
module.exports = EnrollmentModel;
