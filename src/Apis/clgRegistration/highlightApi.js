import express from "express"
import highlightdetail from "../../Models/college/highlightsModel.js";
import clgdetailcollection from "../../Models/college/clgdetailModel.js";
import uuid4 from "uuid4";
import highlightdetailcollection from "../../Models/college/highlightsModel.js";
import authorization from "../../middleware/auth.js";

// configure the router
const highlightRouter = express.Router()


// api for clgdetail highlight  add process
highlightRouter.post("/v2/reg/highlight", authorization, async (req, res) => {
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const highlightid = uuid4()
            const { collegeid, skill_development, career, scholarship, safety_security } = req.body

            //verifying the incoming data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            //verifying the incoming data
            if (skill_development === null || skill_development === undefined || skill_development === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter skill_development"
                })
                return
            }

            //verifying the incoming data
            if (career === null || career === undefined || career === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter career"
                })
                return
            }

            //verifying the incoming data
            if (scholarship === null || scholarship === undefined || scholarship === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter scholarship"
                })
                return
            }

            //verifying the incoming data
            if (safety_security === null || safety_security === undefined || safety_security === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter safety_security"
                })
                return
            }

            const highlight = new highlightdetail({ collegeid, highlightid, skill_development, career, scholarship, safety_security })

            const highlightdata = await highlight.save()

            res.status(201).send({ message: "successfully data add" })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
})

// api for edit highlight detail
highlightRouter.patch("/v2/reg/highlight/edit", authorization, async (req, res) => {

    try {
        if (req.role === "superadmin" || req.role === "clgadmin") {

            const highlightid = req.body.highlightid
            const updateskilldevelopment = req.body.skill_development
            const updatecareer = req.body.career
            const updatescholarship = req.body.scholarship
            const updatesafetysecurity = req.body.safety_security

            const highlightdataupdation = await highlightdetailcollection.updateMany({ highlightid }, { $set: { skill_development: updateskilldevelopment, career: updatecareer, scholarship: updatescholarship, safety_security: updatesafetysecurity  , updatedAt: new Date()} })

            res.status(200).send({
                status: "success",
                msg: "data updated"
            })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(304).send(error)
    }

})
export default highlightRouter