import mongoose from "mongoose";
import passHashed from "../../Services/Encryption/PassHashing.js";

const clgsignupSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,

    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    },
    role: {
        type: String,
        required: true
    },
    collegeid: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

clgsignupSchema.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})


const clgsigup = new mongoose.model("clgsignup", clgsignupSchema)

export default clgsigup    