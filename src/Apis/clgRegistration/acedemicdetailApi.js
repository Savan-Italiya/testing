import express from "express"
import multer from "multer"
import db from "../../db/firebaseconn.js"
import * as firebase from "firebase/app"
import uuid4 from "uuid4"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import academicdetail from "../../Models/college/academicsModel.js"
import authorization from "../../middleware/auth.js"

const acedemicdetailRouter = express.Router()

const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()


// api for add acaedmic detail for college registration process
acedemicdetailRouter.post("/v2/reg/acedemicdetail", authorization, upload.single("image"), async (req, res) => {
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const imageid = uuid4()

            const { collegeid, more_info } = req.body

            // validate the receive data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            // validate the receive data
            if (more_info === null || more_info === undefined || more_info === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter more_info"
                })
                return
            }

            if (!req.file) {
                res.status(400).send("no file uploaded");
                return
            }

            const storageRef = ref(storage, req.file.originalname)
            const metadata = {
                contentType: 'image/jpeg'
            };

            //get image url and store in database
            uploadBytes(storageRef, req.file.buffer, metadata).then(() => {
                getDownloadURL(storageRef).then(url => {
                    const acdemicimage = new academicdetail({ imageid, collegeid, url, more_info })

                    const acedemicimagedata = acdemicimage.save()

                    res.status(201).send({ message: "succes" })

                }).catch(error => {
                    console.log(error);
                    res.status(500).send(error)
                })

            })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
})

//api for remove academic image from database
acedemicdetailRouter.post("/v2/academicimage/remove", async (req, res) => {

    const imageid = req.body.imageid

    const deleteimage = await academicdetail.deleteOne({ imageid })

    return res.status(201).send({ message: "successfully removed" })

})

export default acedemicdetailRouter