import express from "express"
import subjectdetailcollection from "../../Models/college/subjectModel.js"
import authorization from "../../middleware/auth.js"

const courselistRouter = express.Router()


//api for get course list
courselistRouter.get("/v2/courselist/get", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const collegeid = req.body.collegeid

            if (!collegeid) {

                const course = await subjectdetailcollection.find({})

                res.status(201).send(course)

            } else {

                const course1 = await subjectdetailcollection.find({ collegeid })

                res.status(201).send(course1)
            }
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        res.status(404).send(error)
    }
})

export default courselistRouter