//model file for subject detail data

import mongoose from "mongoose";

const subjectschema = mongoose.Schema({

    collegeid: { type: String ,unique : true },

    subjectid: {
        type: String,
        unique: true
    },

    subject: [{
        _id : false, 

        subjectname: {
            type: String,
            required: true,
            
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        no_of_seats: {
            type: Number,
            required: true
        }
    }],

    eligibility_criteria: {
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

const subjectdetailcollection = new mongoose.model("subject", subjectschema)

export default subjectdetailcollection
