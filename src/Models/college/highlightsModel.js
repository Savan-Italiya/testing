// model file for highlight detail data

import mongoose, { Schema } from "mongoose";

const highlightsschema = new mongoose.Schema({

    collegeid: { type: String ,unique : true },

    highlightid: {
        type: String,
        required: true
    },

    skill_development: [{
        _id : false, 
        status: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: false,
            maxlength: [500, 'characters left']
        }
    }],

    career: [{
        _id : false, 
        status: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: false,
            maxlength: [500, 'characters left']
        }
    }],

    scholarship: [{
        _id: false , 
        status: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: false,
            maxlength: [500, 'characters left']
        },
    }],


    safety_security: {
        type: String,
        required: true,
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

const highlightdetailcollection = new mongoose.model("highlight", highlightsschema)

export default highlightdetailcollection