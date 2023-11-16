import mongoose, { Schema } from "mongoose";

const culturalschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    image: {
        type: Image,
        required: true
    },

    more_info: {
        type: String,
        required: true,
        trim: true
    }
})

const culturaldetail = new mongoose.model("cultural", culturalschema)

export default culturaldetail