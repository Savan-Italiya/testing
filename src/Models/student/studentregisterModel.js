import mongoose, { Schema } from "mongoose";

const studentregisterschema = mongoose.Schema({

    studentid: {
        type: Number,
        minLength: 5,
        maxLength: 5,
        require: true,
        trim: true,
        unique: true
    },

    full_name: {
        type: String,
        trim: true,
        required: [true, 'This field is required.']
    },

    mother_name: {
        type: String,
        trim: true,
        required: [true, 'This field is required.'],
    },

    dateofbirth: {
        type: Date,
        trim: true,
        required: [true, 'This field is required.'],
    },

    school_studied: {
        type: String,
        trim: true,
        required: [true, 'This field is required.'],
    },

    community: {
        type: String,
        trim: true,
        required: [true, 'This field is required.'],
    },

    distract: {
        type: String,
        trim: true,
        require: true
    },

    steam: {
        type: String,
        trim: true,
        require: true
    },

    second_language: {
        type: String,
        trim: true,
        require: true
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

    reservation: {
        type: String,
        trim: true,
        require: true
    },

    father_name: {
        type: String,
        trim: true,
        required: [true, 'This field is required.']
    },

    mother_name: {
        type: String,
        trim: true,
        require: true
    },

    gender: {
        enum: ['Male', 'Female'],
        trim: true,
        required: [true, 'This field is required.'],
    },

    place: {
        type: String,
        trim: true,
        require: true
    },

    religion: {
        type: String,
        trim: true,
        require: true
    },

    mandal: {
        type: String,
        trim: true,
        require: true
    },

    course: {
        type: String,
        trim: true,
        required: [true, 'This field is required.']
    },

    medium: {
        type: String,
        trim: true,
        require: true
    },

    phone: {
        type: Number,
        trim: true,
        required: [true, 'This field is required.'],
        unique: true,
        maxLength: 10
    }

})

const studentregister = new mongoose.model("student", studentregisterschema)

export default studentregister