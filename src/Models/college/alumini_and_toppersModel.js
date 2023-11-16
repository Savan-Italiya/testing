import mongoose from "mongoose";

const alutoppersschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    Image: {
        type: Image,
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    passing_out_year: {
        type: Number,
        required: true
    },

    marks: {
        type: Number,
        required: true
    },

    more_info: {
        type: String,
        required: true,
        trim: true
    }

})

const alutoppersdetail = new mongoose.model("cultural", alutoppersschema)

export default alutoppersdetail