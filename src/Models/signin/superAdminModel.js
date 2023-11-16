import mongoose from "mongoose";
import passHashed from "../../Services/Encryption/PassHashing.js";

const superAdmin = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength: [8, 'Minimum password length must be 8 characters']
    },
    role: {
        type: String,
        required: true,
        default: "superadmin"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

superAdmin.pre("save", async function (next) {

    try {

        this.password = await passHashed(this.password)
        return next();

    } catch (error) {
        console.log(error);
        return next()
    }
})
const superAdminData = new mongoose.model("superAdmin", superAdmin)

export default superAdminData