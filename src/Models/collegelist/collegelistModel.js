import mongoose, { Schema } from "mongoose";

const clglistschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    admissionid: [{ type: Schema.Types.ObjectId, ref: 'admissionid' }],

    clglistid: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    colleges: {
        type: String,
        required: true,
    },

    city: {
        type: String,
        required: true
    },

    total_admission: {
        type: Number,
        required: true
    },

    applied_admission: {
        type: Number,
        required: true
    },

    onboard_status: {
        type: String
    },

    college_type: {
        type: String
    },

    review_status: {

    },

    payment_status: {
        type: String
    }

})

const clglist = new mongoose.model("clglist", clglistschema)

export default clglist