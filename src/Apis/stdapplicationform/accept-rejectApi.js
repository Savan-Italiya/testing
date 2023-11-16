import express from "express"

import studentregister from "../../Models/student/studentregisterModel.js"

import applyclg from "../../Models/applycollege/applyforclgModel.js"

import authorization from "../../middleware/auth.js"
import clgdetailcollection from "../../Models/college/clgdetailModel.js"

const stdappliform = new express.Router()

//api for accept/reject student application form
stdappliform.patch("/v2/stdappli/accept-reject/api", authorization, async (req, res) => {
    
    try {

        if (req.role === 'clgadmin') {

            const studentid = req.body.studentid
            const collegeid = req.body.collegeid
            const subjectid = req.body.subjectid
            const result = req.body.result

            // validate the receive data
            if (studentid === null || studentid === undefined || studentid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter studentid"
                })
                return
            }

            // validate the receive data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            // validate the receive data
            if (subjectid === null || subjectid === undefined || subjectid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter subjectid"
                })
                return
            }

            if (result === "accept") {
                const studentdataupdation = await applyclg.updateOne({ studentid ,collegeid , subjectid }, { $set: { status: "accepted"  } })
                res.status(201).send({
                    message: "application Accepted"
                })
            }
            else if (result === "reject") {
                const studentdataupdation = await applyclg.updateOne({ studentid }, { $set: { status: "rejected"  } })
                res.status(201).send({
                    message: "application Rejected"
                })
            }

            const total  = await applyclg.count({collegeid , status : "accepted"} )

            // console.log(total);

            const totaladmission = await clgdetailcollection.updateMany({ collegeid }, { $set: {total_admission: total }} )

        } else {
            res.status(403).send("you don't have a access ")
        }
    } catch (error) {
        console.log(error);
        res.status(304).send({ error: error })
    }

})

export default stdappliform