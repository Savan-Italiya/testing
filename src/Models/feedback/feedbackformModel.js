import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema({

    feedbackid: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },
    message: {
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

const feedbackcollection = new mongoose.model("feebackdetail", feedbackSchema)

export default feedbackcollection