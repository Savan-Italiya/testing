import express from "express"
import multer from "multer"
import db from "../../db/firebaseconn.js"
import authorization from "../../middleware/auth.js"
import * as firebase from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import uuid4 from "uuid4"

import culturaldetail from "../../Models/college/culturalModel.js"
import culturaldetailcollection from "../../Models/college/culturalModel.js"

const culturaldetailRouter = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()

// api for add cultural detail for clg registration process
culturaldetailRouter.post("/v2/reg/culturaldetail", authorization, upload.single("image"), async (req, res) => {
    try {


        if (req.role === "superadmin" || req.role === "clgadmin") {

            const imageid = uuid4()

            const { collegeid, more_info } = req.body

             //verifying the incoming data
             if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

             //verifying the incoming data
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
                contentType: 'image/jpeg' || 'image/png' || 'image/jpg'
            };

            //get image url and store in database
            uploadBytes(storageRef, req.file.buffer, metadata).then(() => {
                getDownloadURL(storageRef).then(url => {
                  
                    const culturalimage = new culturaldetail({ imageid, collegeid, url, more_info })

                    const culturaldata = culturalimage.save()

                    res.status(201).send({ message: "succes" })

                }).catch(error => {
                    console.log(error);
                    return res.status(500).send(error)
                })

            })
        } else {
            res.status(403).send("you don't have a access ")
        }
    } catch (error) {
        console.log(error);
    }
})

//api for remove cultural image from database
culturaldetailRouter.post("/v2/cultural/remove", async (req, res) => {

    const imageid = req.body.imageid

    const deleteimage = await culturaldetailcollection.deleteOne({ imageid })

    return res.status(201).send({ message: "successfully removed" })

})


export default culturaldetailRouter