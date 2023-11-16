import mongoose, { Schema } from "mongoose";

const feestructureschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    subjectid: [{ type: Schema.Types.ObjectId, ref: 'subjectid' }],


    subjectfee: [{
        subjectname: {
            type: String,
            required: true
        },

        fee: {
            type: Number,
            required: true,
            trim: true
        }
    }],

    fee_terms: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, 'characters left']
    }
})

const feestructuredatail = new mongoose.model("feestructure", feestructureschema)

export default feestructuredatail