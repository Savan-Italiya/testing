import express from "express"
import uuid4 from "uuid4"
import db from "../../db/firebaseconn.js"
import multer from "multer"

import * as firebase from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

import authorization from "../../middleware/auth.js"
import staffdetailcollection from "../../Models/college/management_staffModel.js"



const staffdetailRouter = express.Router()


const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()



// api for add staff detail for clg reg process 
staffdetailRouter.post("/v2/reg/management_staffdetail", authorization, upload.single("profilepicture"), async (req, res) => {

   
    try {
        const staffid = uuid4()
        const { collegeid, name, qualification, total, current,  designation, about ,isOpen } = req.body

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

        //verifying the incoming data
        if (qualification === null || qualification === undefined || qualification === "") {
            res.status(401).send({
                status: "failed",
                error: "enter qualification"
            })
            return
        }

        //verifying the incoming data
        if (total === null || total === undefined || total === "") {
            res.status(401).send({
                status: "failed",
                error: "enter total"
            })
            return
        }

        //verifying the incoming data
        if (current === null || current === undefined || current === "") {
            res.status(401).send({
                status: "failed",
                error: "enter current"
            })
            return
        }

        //verifying the incoming data
        if (designation === null || designation === undefined || designation === "") {
            res.status(401).send({
                status: "failed",
                error: "enter designation"
            })
            return
        }

        //verifying the incoming data
        if (about === null || about === undefined || about === "") {
            res.status(401).send({
                status: "failed",
                error: "enter about"
            })
            return
        }
    
        //upload image on firebase
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
                
                const experience = {total , current}

                const staff = new staffdetailcollection({ collegeid, staffid,  url , name, qualification, experience ,  designation, about , isOpen})

                const staffdata = staff.save()

                res.status(201).send({ message: "succes" })

            }).catch(error => {
                console.log(error);
                res.status(500).send(error)
            })

        })

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

})

//api for edit staff detail for clg reg process
staffdetailRouter.patch("/v2/reg/management_staffdetail/edit", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const staffid = req.body.staffid
            const updatename = req.body.name
            const updatequalification = req.body.qualification
            const updateexperience = req.body.experience
            const updatedesignation = req.body.designation
            const updateabout = req.body.about

            const staffupdation = await staffdetailcollection.updateMany({ staffid }, { $set: { name: updatename, qualification: updatequalification, experience: updateexperience, designation: updatedesignation, about: updateabout  , updatedAt: new Date()} })

            console.log(staffupdation);

            res.status(200).send({
                status: "success",
                msg: "data updated"
            })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(304).send(error)
    }
})

//api for get staff detail 
staffdetailRouter.get("/v2/staffdetail/get" , async (req, res) => {

try {
    const staff  = await staffdetailcollection.find({})

    res.status(201).send({staff})

} catch (error) {
    console.log(error);
    return res.status(400).send({error : error})
}

})

export default staffdetailRouter