//model file for aluminitoppers data 

import mongoose from "mongoose";

const alutoppersschema = mongoose.Schema({

    collegeid: { type: String ,unique : true },

    url : {type: String , required: true},

    alutopperid: {
        type: String,
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
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }

})

const alutoppersdetailcollcetion = new mongoose.model("aluimini_toppers", alutoppersschema)

export default alutoppersdetailcollcetion