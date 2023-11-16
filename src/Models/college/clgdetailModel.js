import mongoose, { Schema } from "mongoose";
import validator from "validator"

const clgdetailschema = mongoose.Schema({

    collegeid: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },

    collegename: {
        type: String,
        required: [true, 'This field is required.'],
        trim: true,
        unique: true
    },

    email: {
        type: String,
        required: [true, 'This field is required.'],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: Number,
        required: [true, 'This field is required.'],
        trim: true,
        maxLength: 10,
        unique: true,
        validate(value) {
            if (parseInt(value) === null) {
                throw new Error("mobile must contaion only digits")
            }
        }
    },

    address: {
        type: String,
        required: [true, 'This field is required.'],
        trim: true
    },

    location: {

    },

    college_type: {
        enum: ['private', 'government'],
        required: true,
    },

    system_type: {
        enum: ['Co-Ed', 'Regular'],
        required: true,
    },

    acedemic_type: {
        enum: ['Day College', 'Weekend College', 'Night College'],
        required: true
    },

    affiliated: {
        enum: ['stateboard', 'nationalboard', 'university'],
        required: true
    },

    class_rooms: {
        type: Number,
        required: true,
        trim: true
    },

    total_seats: {
        type: Number,
        required: true,
        trim: true
    },

    class_type: {
        enum: ['AC', 'Non-AC'],
        required: true
    },

    college_code: {
        type: Number,
        trim: true,
        required: true
    },

    college_area: {
        type: Number,
        trim: true,
        required: true
    },

    no_of_floors: {
        type: Number,
        trim: true,
        required: true
    },

    timings: [{
        open: {
            enum: ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM']
        },
        close: {
            enum: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM']
        },
        Mon_to_Sat: {
            enum: ['Mon to Sat', 'Mon to Fri']
        }
    }],

    more_info: {
        type: String,
        maxlength: [500, 'characters left']
    }

})

const clgdetail = new mongoose.model("clg", clgdetailschema)

export default clgdetail