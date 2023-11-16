import mongoose, { Schema } from "mongoose";

import passHashed from "../../Services/Encryption/PassHashing.js";

const teamschema = new mongoose.Schema({

    // collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],
    teammemberid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        // required: true
    },

    employeeId: {
        type: Number,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: {
            values: ['admin', 'moderator', 'viewer'],
            message: '{VALUE} is not supported'
        },
        required: true,
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    },

    encryppass: {
        type: String
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
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
