import mongoose, { Schema } from "mongoose";
import passHashed from "../../Services/Encryption/PassHashing.js";


const superadmineroleaSchema = new mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    role: {
        enum: ['admin', 'Moderator', 'viewer'],
        required: true
    },

    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    }
})

superadmineroleaSchema.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})

const superadminerole = new mongoose.model("clgadminrole", superadmineroleaSchema)

export default superadminerole