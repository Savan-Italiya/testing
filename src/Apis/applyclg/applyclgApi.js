import express from "express"
import uuid4 from "uuid4"

import applyclg from "../../Models/applycollege/applyforclgModel.js"
import clgdetailcollection from "../../Models/college/clgdetailModel.js"
import subjectdetailcollection from "../../Models/college/subjectModel.js"
import studentregister from "../../Models/student/studentregisterModel.js"

const applyclgRouter = express.Router()

// api for apply for college
applyclgRouter.post("/v2/apply/clg", async (req, res) => {

    const applyid = uuid4()
    try {

        const { collegeid, subjectid, studentid, student_detail, parent_detail, upload_document, status, payment_status } = req.body

        // validate the receive data
        if (collegeid === null || collegeid === undefined || collegeid === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct collegeid"
            })
            return
        }

        // validate the receive data
        if (subjectid === null || subjectid === undefined || subjectid === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct subjectid"
            })
            return
        }

        // validate the receive data
        if (studentid === null || studentid === undefined || studentid === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct studentid"
            })
            return
        }



        const studentname = await studentregister.find({ studentid })

        // validate the receive data
        if (studentname.length == 0) {
            res.status(400).send({
                error: "invalid student"
            })
            return
        }

        const college = await clgdetailcollection.find({ collegeid })

        // validate the receive data
        if (college.length == 0) {
            res.status(400).send({
                error: "invalid college"
            })
            return
        }

        const course = await subjectdetailcollection.find({ collegeid, subjectid })

        // validate the receive data
        if (course.length == 0) {
            res.status(400).send({
                error: "invalid course"
            })
            return
        }



        const previousApplications = await applyclg.find({ collegeid, subjectid, studentid })

        let returnFlag = 0

        if (previousApplications != 0) {
            for (const val of previousApplications) {
                if (val.status == "pending" || val.status == "accepted") {
                    res.status(403).send({
                        message: `for this course your's previos application is already in ${val.status} mode`
                    })
                    returnFlag = 1
                    return
                }
                if (returnFlag === 1) {
                    return
                }
            }
        }

        if (returnFlag === 1) {
            return
        }

        const applyclgdetail = new applyclg({ applyid, studentname, collegeid, studentid, subjectid, course, college, student_detail, parent_detail, upload_document, status, payment_status })

        const applyclgdata = await applyclgdetail.save()

        // update a count number of applied admission in college list
        const countapplied = await applyclg.count({ collegeid })

        const applied_admission = await clgdetailcollection.updateMany({ collegeid }, { $set: { applied_admission: countapplied } })

        //verify the data
        if (!applyclgdata) {
            res.status(500).send({ error: "Failed to apply " })
            return
        }
        else {
            res.status(201).send({ Message: "sucessfully apply" })
            return
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
})

export default applyclgRouter