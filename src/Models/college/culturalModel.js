//model file for cultural detail data

import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const culturalschema = mongoose.Schema({
    collegeid: { type: String ,unique : true },

    imageid : {type: String , required : true},

    url: {
        type: String,
        required: true
    },

    more_info: {
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }
})

const culturaldetailcollection = new mongoose.model("cultural", culturalschema)

export default culturaldetailcollection