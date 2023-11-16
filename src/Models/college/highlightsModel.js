import mongoose, { Schema } from "mongoose";

const highlightsschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    highlight: [{
        skill: {
            enum: ['skill development']
        },
        career: {
            enum: ['career counselling']
        },
        scholarship: {
            enum: ['scholarship']
        }
    }],

    safety_security: {
        type: String,
        required: true,
        maxlength: [500, 'characters left']
    }

})

const highlightdetail = new mongoose.model("highlight", highlightsschema)

export default highlightdetail