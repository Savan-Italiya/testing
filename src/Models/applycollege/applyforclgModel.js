import mongoose, { Schema } from "mongoose";

const applyclgschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    subjectid: [{ type: Schema.Types.ObjectId, ref: 'subjectid' }],

    applyid: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    payment_status: {
        type: String,
        required: true
    }
})

const applyclg = new mongoose.model("applyforclg", applyclgschema)

export default applyclg