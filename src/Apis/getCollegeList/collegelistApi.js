import express from "express"
import clgdetailcollection from "../../Models/college/clgdetailModel.js"
import applyclg from "../../Models/applycollege/applyforclgModel.js"
import authorization from "../../middleware/auth.js";
import infrastructurecollection from "../../Models/college/InfrastructureModel.js";
import acedemicdetailRouter from "../clgRegistration/acedemicdetailApi.js";
import academicdetailcollection from "../../Models/college/academicsModel.js";
import alutoppersdetailcollcetion from "../../Models/college/alumini_and_toppersModel.js";
import clgimagedetailcollection from "../../Models/college/collegeimageModel.js";
import clgpolicysocialmediadetailcollection from "../../Models/college/collegepolicy_socialmediaModel.js";
import culturaldetailcollection from "../../Models/college/culturalModel.js";
import feestructuredatailcollection from "../../Models/college/feestructureModel.js";
import highlightdetailcollection from "../../Models/college/highlightsModel.js";
import staffdetailcollection from "../../Models/college/management_staffModel.js";
import sportsdetailcollection from "../../Models/college/sportsModel.js";
import subjectdetailcollection from "../../Models/college/subjectModel.js";

const collegelistRouter = express.Router()

//api for get college list for super admin
collegelistRouter.get("/v2/collegelist/get", async (req, res) => {

    try {


        const collegeid = req.body.collegeid

        

        if (!collegeid) {

            const college = await clgdetailcollection.find({})
            const infra = await infrastructurecollection.find({})
            const acedemic = await academicdetailcollection.find({})
            const alumini_and_toppers = await alutoppersdetailcollcetion.find({})
            const clgimage = await clgimagedetailcollection.find({})
            const clgpolicySocialMedia = await clgpolicysocialmediadetailcollection.find({})
            const cultural = await culturaldetailcollection.find({})
            const feeStructure = await feestructuredatailcollection.find({})
            const highlight = await highlightdetailcollection.find({})
            const management_staff = await staffdetailcollection.find({})
            const sports = await sportsdetailcollection.find({})
            const subject = await subjectdetailcollection.find({})

            const total = await applyclg.count({})

            return res.status(201).send({ college, infra, highlight, sports, cultural, acedemic, alumini_and_toppers, management_staff, subject, feeStructure, clgimage, clgpolicySocialMedia, total })

        } else {
            const college = await clgdetailcollection.find({ collegeid })
            const infra = await infrastructurecollection.find({ collegeid })
            const acedemic = await academicdetailcollection.find({ collegeid })
            const alumini_and_toppers = await alutoppersdetailcollcetion.find({ collegeid })
            const clgimage = await clgimagedetailcollection.find({ collegeid })
            const clgpolicySocialMedia = await clgpolicysocialmediadetailcollection.find({ collegeid })
            const cultural = await culturaldetailcollection.find({ collegeid })
            const feeStructure = await feestructuredatailcollection.find({ collegeid })
            const highlight = await highlightdetailcollection.find({ collegeid })
            const management_staff = await staffdetailcollection.find({ collegeid })
            const sports = await sportsdetailcollection.find({ collegeid })
            const subject = await subjectdetailcollection.find({ collegeid })

            const total = await applyclg.count({})
            return res.status(201).send({ college, infra, highlight, sports, cultural, acedemic, alumini_and_toppers, management_staff, subject, feeStructure, clgimage, clgpolicySocialMedia, total })

        }
    } catch (error) {

        console.log(error);
        res.status(400).send({ error: error })
    }
})
export default collegelistRouter 
