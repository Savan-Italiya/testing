import express from "express"

import clgpolicysocialmediadetail from "../../Models/college/collegepolicy_socialmediaModel.js"
import authorization from "../../middleware/auth.js"
import uuid4 from "uuid4"

const clgpolicySocialMediaRouter = express.Router()



// api for add clg policy and social media detail  for clg registration process
clgpolicySocialMediaRouter.post("/v2/reg/clgplcysocial", authorization, async (req, res) => {
    try {
        if (req.role === "superadmin" || req.role === "clgadmin") {

            const clgpolicyid = uuid4()
            const { collegeid, terms_condition, website, facebook, youtube, instagram } = req.body

            //verifying the incoming data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            //verifying the incoming data
            if (terms_condition === null || terms_condition === undefined || terms_condition === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter terms_condition"
                })
                return
            }

            //verifying the incoming data
            if (website === null || website === undefined || website === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter website"
                })
                return
            }

            //verifying the incoming data
            if (facebook === null || facebook === undefined || facebook === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter facebook"
                })
                return
            }

            //verifying the incoming data
            if (youtube === null || youtube === undefined || youtube === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter youtube"
                })
                return
            }

            //verifying the incoming data
            if (instagram === null || instagram === undefined || instagram === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter instagram"
                })
                return
            }

            const policydata = new clgpolicysocialmediadetail({ collegeid, clgpolicyid, terms_condition, website, facebook, youtube, instagram })

            const clgpolicysocial = await policydata.save()


            //clear cookie
            res.clearCookie("collegeid")

            res.status(201).send({ message: "succesfully data add" })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }
})


// api for edit clg policy and social media detail process
clgpolicySocialMediaRouter.patch("/v2/reg/clgplcysocial/edit", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {
            const clgpolicyid = req.body.clgpolicyid
            const updatetermscondition = req.body.terms_condition
            const updatewebsite = req.body.website
            const updatefacebook = req.body.facebook
            const updateyoutube = req.body.youtube
            const updateinstagram = req.body.instagram

            const clgpolicyupdation = await clgpolicysocialmediadetail.updateMany({ clgpolicyid }, { $set: { terms_condition: updatetermscondition, website: updatewebsite, facebook: updatefacebook, youtube: updateyoutube, instagram: updateinstagram , updatedAt: new Date()}})

            

            res.status(201).send({
                status: "success",
                msg: "data updated"
            })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(404).send({ error: error });
    }
})

export default clgpolicySocialMediaRouter