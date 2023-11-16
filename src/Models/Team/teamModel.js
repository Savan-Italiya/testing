import mongoose, { Schema } from "mongoose";
import validator from "validator";

import passHashed from "../../Services/Encryption/PassHashing.js";

const teamschema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    name: {
        type: String,
        required: true
    },

    employeeId: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    }
})


teamschema.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})

const teammodel = new mongoose.model("team", teamschema)

export default teammodel