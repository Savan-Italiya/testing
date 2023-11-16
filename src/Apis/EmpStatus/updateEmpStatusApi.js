import express from "express"
import staffdetailcollection from "../../Models/college/management_staffModel.js"

const empstatusRouter = express.Router()

// api for update employee detail status hide or publish api   
empstatusRouter.patch("/v2/empstatus", async (req, res) => {

    try {
        const { staffid, isOpen } = req.body

        // validate the receive data
        if (staffid === null || staffid === undefined || staffid === "") {
            res.status(401).send({
                status: "failed",
                error: "enter staffid"
            })
            return
        }

        // validate the receive data
        if (isOpen === null || isOpen === undefined || isOpen === "") {
            res.status(401).send({
                status: "failed",
                error: "enter isOpen"
            })
            return
        }

        const statuspublish = await staffdetailcollection.updateOne({ staffid }, { $set: { isOpen: isOpen  , updatedAt: new Date() } })
        res.status(201).send("success")


    } catch (error) {
        console.log(error);
        res.status(400).send({ error })
    }

})
export default empstatusRouter