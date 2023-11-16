//model file for clg detail data


import mongoose from "mongoose";
import { Schema } from "mongoose";
import { uuid } from "uuidv4";
// import validator from "validator"

const clgdetailschema = mongoose.Schema({

    collegeid: {
        type: String,
        required: true,
        unique: true,
    },

    collegename: {
        type: String,
        required: [true, 'This field is required.'],
        unique: true
        // trim: true,
    },

    email: {
        type: String,
        required: [true, 'This field is required.'],
        unique: true,
        // trim: true,
        lowercase: true,
        // validate(value) {
        //     if (!validator.isEmail(value)) {
        //         throw new Error('Email is invalid')
        //     }
        // }
    },
    phone: [{
        type: Object,
        required: [true, 'This field is required.'],
        // trim: true,
        maxLength: 10,
        unique: true,
        // validate(value) {
        //     if (parseInt(value) === null) {
        //         throw new Error("mobile must contaion only digits")
        //     }
        // }
    }],

    address: {
        type: String,
        required: [true, 'This field is required.'],
        // trim: true,
    },

    location: {
        type: String,
        required: true

    },

    college_type: {
        type: String,
        enum: {
            values: ['private', 'government'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    system_type: {
        type: String,
        enum: {
            values: ['co-ed', 'regular'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    academic_type: {
        type: String,
        enum: {
            values: ['day college', 'weekend college', 'night college'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    affiliated: {
        type: String,
        enum: {
            values: ['stateboard', 'nationalboard', 'university'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    class_rooms: {
        type: Number,
        required: true,
        // trim: true,
    },

    total_seats: {
        type: Number,
        required: true,
        // trim: true,
    },

    class_type: {
        type: String,
        enum: {
            values: ['ac', 'non-ac'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    college_code: {
        type: Number,
        // trim: true,
        required: true,
    },

    college_area: {
        type: Number,
        // trim: true,
        required: true,
    },

    no_of_floors: {
        type: Number,
        // trim: true,
        required: true,
    },

    timings: [{
        
        open: {
            type: String,
            enum: {
                values: ['7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12:00 am']
            }
        },
        close: {
            type: String,
            enum: {
                values: ['1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm']
            }
        },
        Mon_to_Sat: {
            type: String,
            enum: {
                values: ['mon to sat', 'mon to fri']
            }
        },
    }],
    
    more_info: {
        type: String,
        maxlength: [500, 'characters left']
    },

    total_admission : {
        type: Number,
        default : 0
    },
    applied_admission : {
        type: Number,
        default : 0
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }


})

const clgdetailcollection = new mongoose.model("clg", clgdetailschema)

export default clgdetailcollection