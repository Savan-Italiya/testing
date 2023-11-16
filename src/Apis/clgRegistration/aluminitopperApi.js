import express from "express"
import uuid4 from "uuid4"
import db from "../../db/firebaseconn.js"
import multer from "multer"

import * as firebase from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import authorization from "../../middleware/auth.js"
import alutoppersdetailcollcetion from "../../Models/college/alumini_and_toppersModel.js"



const alutoppersRouter = express.Router()


const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()

// api for add alumini and toppers detail  for clg reg process
alutoppersRouter.post("/v2/reg/alutoppers", authorization, upload.single("profilepicture"), async (req, res) => {
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {
            const alutopperid = uuid4()
            const { collegeid, name, passing_out_year, marks, more_info } = req.body

            // validate the receive data
            if (collegeid === null || collegeid === undefined || collegeid === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegeid"
                })
                return
            }

            // validate the receive data
            if (name === null || name === undefined || name === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter name"
                })
                return
            }

            // validate the receive data
            if (passing_out_year === null || passing_out_year === undefined || passing_out_year === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter passing_out_year"
                })
                return
            }

            // validate the receive data
            if (marks === null || marks === undefined || marks === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter marks"
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

            //upload image in firebase
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
                    const alutoppers = new alutoppersdetailcollcetion({ collegeid, url, alutopperid, name, passing_out_year, marks, more_info })

                    const alutoppersdata = alutoppers.save()

                    res.status(201).send({ message: "succes" })

                }).catch(error => {
                    console.log(error);
                    res.status(500).send(error)
                })

            })
        } else {
            res.status(403).send("you don't have a access ")
        }


        // const aluminitoppers = new alutoppersdetailcollcetion({ collegeid, alutopperid, name, passing_out_year, marks, more_info })

        // const alutopperdata = await aluminitoppers.save()

        // res.status(201).send({ message: "succesfully data add" })


    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }
})

//api for edit alumini and toppers detail for clg reg process
alutoppersRouter.patch("/v2/reg/alutoppers/edit", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const alutopperid = req.body.alutopperid
            const updatename = req.body.name
            const updatepassingyear = req.body.passing_out_year
            const updatemarks = req.body.marks
            const updatemoreinfo = req.body.more_info

            const alutoppersupdation = await alutoppersdetailcollcetion.updateMany({ alutopperid }, { $set: { name: updatename, passing_out_year: updatepassingyear, marks: updatemarks, more_info: updatemoreinfo, updatedAt: new Date() } })
            console.log(alutoppersupdation);
            return res.status(200).send({
                status: "success",
                msg: "data updated"
            })

        }

    } catch (error) {
        console.log(error);

    }

})

export default alutoppersRouter