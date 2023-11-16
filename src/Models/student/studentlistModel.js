import mongoose, { Schema } from "mongoose";

const studentlistschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    studentid: [{ type: Schema.Types.ObjectId, ref: 'studentid' }],

    application_no: {
        type: Number,
        required: true
    },

    student_name: {
        type: String,
        required: true
    },

    course_applied_for: {
        type: String
    },

    location: {
        type: String
    },

    ssc_expected_result: {
        type: String
    },

    status: {
        type: String
    }
})

const studentlist = new mongoose.model("studentlist", studentlistschema)

export default studentlist