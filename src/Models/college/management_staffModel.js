import mongoose, { Schema } from "mongoose";

const staffschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    staffid: {
        type: Number,
        required: true,
        unique: true
    },

    profile_picture: {
        type: Image,
        required: true
    },

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
        total: {
            enum: ['1year', '2year', '3year', '4year', '5year', '6year', '7year', '8year', '9year', '10year', '11year', '12year', '13year', '14year', '15year', '16year', '17year', '18year', '19year', '20year'],
            required: true
        },
        current: {
            enum: ['1year', '2year', '3year', '4year', '5year', '6year', '7year', '8year', '9year', '10year', '11year', '12year', '13year', '14year', '15year', '16year', '17year', '18year', '19year', '20year'],
            required: true
        }
    }],

    designation: {
        type: String,
        required: true
    },

    about: {
        type: String,
        required: true
    }

})

const staffdetail = new mongoose.model("management & staff", staffschema)

export default staffdetail