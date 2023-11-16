import express from "express"
import subjectdetailcollection from "../../Models/college/subjectModel.js"
import authorization from "../../middleware/auth.js"
import uuid4 from "uuid4"
const subjectRouter = express.Router()


// api for add subject detail for clg registration process
subjectRouter.post("/v2/reg/subject", authorization, async (req, res) => {
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const subjectid = uuid4()

            const { collegeid, subject, eligibility_criteria } = req.body


            //verifying the incoming data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }


            //verifying the incoming data
            if (subject === null || subject === undefined || subject === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter subject"
                })
                return
            }


            //verifying the incoming data
            if (eligibility_criteria === null || eligibility_criteria === undefined || eligibility_criteria === "") {
                response.status(401).send({
                    status: "failed",
                    error: "enter correct detail"
                })
                return
            }

            const subject1 = await subjectdetailcollection.find({ collegeid, subject })

            // validate the receive data
            if (subject1.length != 0) {
                res.status(400).send({
                    error: "subject is already added"
                })
                return
            }


            const subjectdata = new subjectdetailcollection({ collegeid, subjectid, subject, eligibility_criteria })

            const subejctdetail = await subjectdata.save()

            res.status(201).send({ message: "successfully add" })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

// api for edit subject detail process
subjectRouter.patch("/v2/reg/subject/edit", authorization, async (req, res) => {

    try {
        if (req.role === "superadmin" || req.role === "clgadmin") {

            const subjectid = req.body.subjectid
            const updatesubject = req.body.subject
            const updateeligibilitycriteria = req.body.eligibility_criteria

            const subjectdetailupadation = await subjectdetailcollection.updateMany({ subjectid }, { $set: { subject: updatesubject, eligibility_criteria: updateeligibilitycriteria, updatedAt: new Date() } })

            res.status(200).send({
                status: "success",
                msg: "data updated"
            })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(304).send(error)
    }
})

export default subjectRouter