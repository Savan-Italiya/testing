//model file for clg policy and social media data

import { timeStamp } from "console";
import mongoose from "mongoose";

const clgpolicysocialschema = new mongoose.Schema({

    collegeid: { type: String ,unique : true },
    clgpolicyid: {
        type: String,
        required: true
    },
    terms_condition: {
        type: String,
        required: true,
        maxlength: [500, 'characters left']
    },

    website: {
        type: String,
        required: true
    },

    facebook: {
        type: String,
        required: true
    },

    youtube: {
        type: String,
        required: true
    },

    instagram: {
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

const clgpolicysocialmediadetailcollection = new mongoose.model("policy_socialmedia", clgpolicysocialschema)

export default clgpolicysocialmediadetailcollection