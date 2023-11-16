import express from "express"

import feedbackcollection from "../../Models/feedback/feedbackformModel.js"

import uuid4 from "uuid4"

const feedbackRouter = express.Router()

// api for add data of feedback form 
feedbackRouter.post("/v2/feedbackform/add", async (req, res) => {

    const feedbackid = uuid4()
    try {
        const { subject, message } = req.body

        // validate the receive data
        if (subject === null || subject === undefined || subject === "") {
            res.status(401).send({
                status: "failed",
                error: "enter subject"
            })
            return
        }

        // validate the receive data
        if (message === null || message === undefined || message === "") {
            res.status(401).send({
                status: "failed",
                error: "enter message"
            })
            return
        }

        const feedbackform = new feedbackcollection({ feedbackid, subject, message })

        const feedbackdata = await feedbackform.save()

        res.status(201).send({ message: "success" })

    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
})
export default feedbackRouter