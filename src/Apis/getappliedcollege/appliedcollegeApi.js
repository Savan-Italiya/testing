import express from "express"
import applyclg from "../../Models/applycollege/applyforclgModel.js"
import authorization from "../../middleware/auth.js"

const appliedclgRouter = express.Router()

//api for get student applied college 
appliedclgRouter.get("/v2/appliedclg/get", authorization, async (req, res) => {

    try {

        //role base access for this api
        if (req.role === 'superadmin') {


            const studentid = req.body.studentid

            if (!studentid) {
                const appliedclgdata = await applyclg.find({})

                res.status(201).send({ appliedclgdata })

            } else {
                const appliedclgdata = await applyclg.find({ studentid })

                res.status(201).send({ appliedclgdata })
            }

        } else {
            res.status(403).send("you don't have a access ")
        }


    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error })
    }


})

export default appliedclgRouter