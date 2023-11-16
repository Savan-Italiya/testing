import express from "express"
import feestructuredatail from "../../Models/college/feestructureModel.js"
import authorization from "../../middleware/auth.js"
import uuid4 from "uuid4"

const feestruRouter = express.Router()


// api for add fee structure detail for  clg registration process

feestruRouter.post("/v2/reg/feestructure", authorization, async (req, res) => {
    const feestrucutrid = uuid4()
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const { collegeid, subjectid, subjectfee, fee_terms } = req.body

            //verifying the incoming data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            //verifying the incoming data
            if (subjectid === null || subjectid === undefined || subjectid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter subjectid"
                })
                return
            }

            //verifying the incoming data
            if (subjectfee === null || subjectfee === undefined || subjectfee === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter subjectfee"
                })
                return
            }

            //verifying the incoming data
            if (fee_terms === null || fee_terms === undefined || fee_terms === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter fee_terms"
                })
                return
            }

            const feestructure = new feestructuredatail({ collegeid, subjectid, feestrucutrid, subjectfee, fee_terms })

            const feesdata = await feestructure.save()

            res.status(201).send({ message: "succesfully add" })
        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }
})

//api for edit fee structure detail process

feestruRouter.patch("/v2/reg/feestrucutre/edit", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const feestrucutrid = req.body.feestrucutrid
            const updatesubjectfee = req.body.subjectfee
            const updatefee_terms = req.body.fee_terms

            const feedetailupadation = await feestructuredatail.updateMany({ feestrucutrid }, { $set: { subjectfee: updatesubjectfee, fee_terms: updatefee_terms  , updatedAt: new Date() } })

            console.log(feedetailupadation);

            res.status(200).send({
                status: "success",
                msg: "data updated"
            })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(304).send({ error: error });
    }
})

export default feestruRouter