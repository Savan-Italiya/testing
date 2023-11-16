//model file for clg image data

import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const clgimageschema = mongoose.Schema({

    collegeid: { type: String ,unique : true },

    imageid: { type: String, required: true },
    
    url: {
        type: String,
        required: true
    },

    name: {
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

const clgimagedetailcollection = new mongoose.model("college_images", clgimageschema)

export default clgimagedetailcollection