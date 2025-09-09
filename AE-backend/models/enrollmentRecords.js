const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const enrollmentRecordsSchema = new Schema(

    {
        inDate: {
            type: Date,
            required: true,
        },
        outDate: {
            type: Date,
            required: false,
        },
    }




)



module.exports = {
    schema: enrollmentRecordsSchema,
    model: RecordsModel
}

const EnrollmentRecordsModel = mongoose.model("EnrollmentRecords", enrollmentRecordsSchema);
module.exports = EnrollmentRecordsModel