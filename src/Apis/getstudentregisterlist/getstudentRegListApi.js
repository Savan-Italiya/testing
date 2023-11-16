import express from "express"
import studentregister from "../../Models/student/studentregisterModel.js"

const studentReglistRouter = express.Router()

// api for get all registred student list
studentReglistRouter.get("/v2/allstudentreglist/get", async (req, res) => {

    const studentid = req.body.studentid

    if (!studentid) {
        const studentlist = await studentregister.find({})

        return res.status(201).send({ studentlist })
    } else {
        const studentlist = await studentregister.find({ studentid })

        return res.status(201).send({ studentlist })
    }
})

export default studentReglistRouter