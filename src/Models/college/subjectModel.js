import mongoose, { Schema } from "mongoose";

const subjectschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    subjectid: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    subject: [{

        subjectname: {
            type: String,
            required: true
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
    }

})

const subjectdetail = new mongoose.model("sports", subjectschema)

export default subjectdetail