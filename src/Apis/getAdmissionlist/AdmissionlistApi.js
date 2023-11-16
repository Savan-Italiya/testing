import express from "express"
import applyclg from "../../Models/applycollege/applyforclgModel.js"
import authorization from "../../middleware/auth.js"

const admissionlistRouter = express.Router()

// api for get admission list data for super admin
admissionlistRouter.get("/v2/admissionlist/get", authorization, async (req, res) => {

    try {
        //role base access for this api
        if (req.role === 'superadmin') {

            const admission = await applyclg.find({})

            res.status(201).send({ admission })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error })

    }
})

export default admissionlistRouter
