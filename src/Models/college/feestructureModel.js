//model file for fee structure detail data

import mongoose, { Schema } from "mongoose";
import subjectdetailcollection from "./subjectModel.js";

const feestructureschema = new mongoose.Schema({
    collegeid: { type: String ,unique : true },
    subjectid: { type: String, ref: 'subjects' },

    feestrucutrid: {
        type: String,
        required: true
    },
    subjectfee: [{
        _id : false, 
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
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }
})

const feestructuredatailcollection = new mongoose.model("feestructure", feestructureschema)

export default feestructuredatailcollection