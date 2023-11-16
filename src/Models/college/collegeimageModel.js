import mongoose, { Schema } from "mongoose";

const clgimageschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    image: {
        type: Image,
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    }
})

const clgimagedetail = new mongoose.model("cultural", clgimageschema)

export default clgimagedetail