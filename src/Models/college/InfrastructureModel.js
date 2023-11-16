import mongoose, { Schema } from "mongoose";

const infrastructureschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    smartclass: {
        type: Boolean,
        default: false
    },

    staffroom: {
        type: Boolean,
        default: false
    },

    auditorium: {
        type: Boolean,
        default: false
    },

    computerlab: {
        type: Boolean,
        default: false
    },

    hostel: {
        type: Boolean,
        default: false
    },

    bustransport: {
        type: Boolean,
        default: false
    },

    parking: {
        type: Boolean,
        default: false
    },

    cctv: {
        type: Boolean,
        default: false
    },

    library: {
        type: Boolean,
        default: false
    },

    elevator: {
        type: Boolean,
        default: false
    },

    powerbackup: {
        type: Boolean,
        default: false
    },

    canteen: {
        type: Boolean,
        default: false
    },

    medicalsupport: {
        type: Boolean,
        default: false
    },

    firesafety: {
        type: Boolean,
        default: false
    },

    emergencyexit: {
        type: Boolean,
        default: false
    },

    playground: {
        type: Boolean,
        default: false
    },

    moreinfo: {
        type: String,
        maxlength: [500, 'characters left']
    }

})

const infrastructure = new mongoose.model("infrastructure", infrastructureschema)

export default infrastructure