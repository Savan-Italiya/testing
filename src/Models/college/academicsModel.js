import mongoose from "mongoose";

const academicsschema = mongoose.Schema({

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

const academicdetail = new mongoose.model("cultural", academicsschema)

export default academicdetail