//model file for apply for clg data
import mongoose, { Schema } from "mongoose";

const applyclgschema = new mongoose.Schema({

    applicationNo: { type: Number },

    studentname: { type: Object, ref: 'studentsid' },

    collegeid: { type: String, ref: 'clgs', required: true },

    studentid: { type: String, ref: 'students', required: true },

    subjectid: { type: String, ref: 'subjects', required: true },

    course: { type: Object, ref: 'subjects' },

    college: {
        type: Object
    },

    applyid: {
        type: String,
        required: true
    },

    //student detail
    student_detail: [{
        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        nationality: {
            type: String,
            required: true
        },

        mother_tongue: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            required: true
        },

        dob: {
            type: String,
            required: true
        },

        blood_group: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        district: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        religion: {
            type: String,
            required: true
        },

        caste_name: {
            type: String,
            required: true
        },

        sub_caste_name: {
            type: String,
            required: true
        },

        caste_category: {
            type: String,
            required: true
        },

        reservation: {
            type: String,
            required: true
        },

        examination_passed: {
            type: String,
            required: true
        },

        school_last_studied: {
            type: String,
            required: true
        },

        exam_year: {
            type: String,
            required: true
        },

        groupe_applied: {
            type: String,
            required: true
        },

        second_language: {
            type: String,
            required: true
        },

        hall_ticket_no: {
            type: Number,
            required: true
        },

        aadhar_no: {
            type: Number,
            required: true
        },
    }],


    //parent detail
    parent_detail: [{
        name_of_father: {

            type: String,
            required: true
        },

        occupation: {
            type: String,
            required: true
        },

        annual_income: {
            type: Number,
            required: true
        },

        address_residence: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true
        },

        address_permanent: {
            type: String,
            required: true
        },

        phone: {
            type: Number,
            required: true,
            maxlength: 10
        },

        email: {
            type: String,
            required: true
        },
    }],

    // upload document url
    upload_document: [{
        photo_url: {
            type: String,
            required: true
        },

        hallticket_url :{
            type: String,
            required: true
        },

        aadharcard_url :{
            type: String,
            required: true
        },

        castcertificate_url: {
            type: String,
            required: true
        }
    }],


    status: {
        type: String,
        default: "pending"
    },

    payment_status: {
        type: String,
        default: "pending"
    },
    createdAt: {
        type: Number,
        default: new Date()
    },
    updatedAt: {
        type: Number
    }

})

const applyclg = new mongoose.model("applyforclg", applyclgschema)

export default applyclg