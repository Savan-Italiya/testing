//model file for academic data

import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const academicsschema = mongoose.Schema({

    collegeid: { type: String ,unique : true },

    imageid  : {type: String , required : true},

    url: {
        type: String,
        required: true
    },

    more_info: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }
}
)

const academicdetailcollection = new mongoose.model("acedemic_detail", academicsschema)

export default academicdetailcollection