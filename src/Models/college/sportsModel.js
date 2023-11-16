//model file for sports detail data

import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const sportsschema = mongoose.Schema({

    collegeid: { type: String ,unique : true },

    imageid : {type: String ,required :true},

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

})

const sportsdetailcollection = new mongoose.model("sports", sportsschema)

export default sportsdetailcollection