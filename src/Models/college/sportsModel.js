import mongoose, { Schema } from "mongoose";

const sportsschema = mongoose.Schema({

    collegeid: [{ type: Schema.Types.ObjectId, ref: 'collegeid' }],

    image: {
        type: Image,
        required: true
    },

    more_info: {
        type: String,
        required: true,
        trim: true
    }

})

const sportsdetail = new mongoose.model("sports", sportsschema)

export default sportsdetail