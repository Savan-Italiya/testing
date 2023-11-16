import mongoose from "mongoose";
import passHashed from "../../Services/Encryption/PassHashing.js";

const signinclgSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    }
})

signinclgSchema.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})

const signinclgadmin = new mongoose.model("signinclgAdmin", signinclgSchema)

export default signinclgadmin