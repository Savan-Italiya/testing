import mongoose, { Schema } from "mongoose";

const admissionschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    clglistid: [{ type: Schema.Types.ObjectId, ref: 'clglistid' }],

    applyid: [{ type: Schema.Types.ObjectId, ref: 'applyid' }],

    admissionid: {
        type: Schema.Types.ObjectId,
        unique: true
    },

    total_admission: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true
    },
    total_admission: {
        type: Number,
        required: true
    },

    collegs: {
        type: String,
        required: true
    },

    status: {

    },

    date: {
        type: Date,
        required: true
    },

    mandal: {
        type: String,
        required: true
    }

})

const admissiondata = new mongoose.model("admissiondata", admissionschema)

export default admissiondata