import express from "express"
import db from "../../db/firebaseconn.js"
import multer from "multer"
import uuid4 from "uuid4"
import * as firebase from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import clgimagedetail from "../../Models/college/collegeimageModel.js"
import authorization from "../../middleware/auth.js"

const clgimageRouter = express.Router()

const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()


// api for add clgimage and detail for clg registration process
clgimageRouter.post("/v2/reg/clgimage", authorization, upload.single("image"), async (req, res) => {
    try {

        const imageid = uuid4()
        if (req.role === "superadmin" || req.role === "clgadmin") {
            const { collegeid, name } = req.body

             //verifying the incoming data
             if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

             //verifying the incoming data
             if (name === null || name === undefined || name === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter name"
                })
                return
            }

            // upload image in firebase
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
                    const clgimage = new clgimagedetail({ imageid, collegeid, url, name })

                    const clgimagedata = clgimage.save()

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

// api for remove college image
clgimageRouter.post("/v2/clgimage/remove", async (req, res) => {

    const imageid = req.body.imageid

    const deleteimage = await clgimagedetail.deleteOne({ imageid })

    return res.status(201).send({ message: "successfully removed" })

})

export default clgimageRouter