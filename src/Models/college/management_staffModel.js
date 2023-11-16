// model file for staff detail data
 
import mongoose from "mongoose";
import { buffer } from "stream/consumers";

const staffschema = new mongoose.Schema({

    collegeid: { type: String ,unique : true },

    url : {type: String },

    staffid: {
        type: String,
        required: true,
        unique: true
    },

    // profile_picture: {
    //     data: buffer,
    //     required: true
    // },

    name: {
        type: String,
        required: true,
        trim: true
    },

    qualification: {
        type: String,
        required: true
    },

    experience: [{
        _id : false,
        total: {
            type: String
        },

        current: {
            type: String
        }
    }],

    designation: {
        type: String,
        required: true
    },

    about: {
        type: String,
        required: true
    },
    isOpen : {
        type: String,
        default: true
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }
})

const staffdetailcollection = new mongoose.model("management & staff", staffschema)

export default staffdetailcollection