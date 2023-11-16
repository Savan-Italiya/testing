import mongoose, { Schema } from "mongoose";
import passHashed from "../../Services/Encryption/PassHashing.js";

const studentregisterschema = mongoose.Schema({

    studentid: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },

    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    school_name: {
        type: String,
        required: [true, 'Please enter a school name'],
    },


    password: {
        type: String,
        required: [true, 'Please enter a valid password'],

    },

    confirm_password: {
        type: String,
        required: [true, 'Please enter a valid confirm password'],
    },

    mobile: {
        type: Number,
        required: [true, 'please enter mobile number.'],
        unique: true,
        maxLength: 10
    },

    email: {
        type: String,
        required: [true, 'This field is required.'],
        unique: true,
        lowercase: true
    },


    createdAt: {
        type: Number,
        default: new Date()
    },

    updatedAt: {
        type: Number
    }


})

studentregisterschema.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        this.confirm_password = await passHashed(this.confirm_password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})

const studentregister = new mongoose.model("student", studentregisterschema)

export default studentregister