import exp from "constants";
import mongoose, { Schema } from "mongoose";

const clgpolicysocialschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

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
    }
})

const policysocialmediadetail = new mongoose.model("policy_socialmedia", clgpolicysocialschema)

export default policysocialmediadetail