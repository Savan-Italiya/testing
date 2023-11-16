import express from "express"
import applyclg from "../../Models/applycollege/applyforclgModel.js"
import clgdetailcollection from "../../Models/college/clgdetailModel.js"
import subjectdetailcollection from "../../Models/college/subjectModel.js"
import studentregister from "../../Models/student/studentregisterModel.js"
import { json } from "stream/consumers"
import authorization from "../../middleware/auth.js"


const studentlistRouter = express.Router()

// api for get student list for clg admin
studentlistRouter.get("/v2/studentlist/get", authorization, async (req, res) => {


    try {
        //role base access for this api
        if (req.role === 'clgadmin') {


            const collegeid = req.body.collegeid

            // validate the receive data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            const studentdetail = await applyclg.find({ collegeid })

            const newDataArray = studentdetail.map((val, index) => {

                const studentname1 = JSON.stringify(val.studentname)
                const course1 = JSON.stringify(val.course)
                const college1 = JSON.stringify(val.college)
            })

            res.status(201).send(studentdetail)

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {

        console.log(error);
        res.status(400).send({ error: error })
    }

})

export default studentlistRouter