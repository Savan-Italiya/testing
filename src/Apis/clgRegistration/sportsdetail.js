import express from "express"
import db from "../../db/firebaseconn.js"
import multer from "multer"
import authorization from "../../middleware/auth.js"
import * as firebase from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import uuid4 from "uuid4"
import 'firebase/storage';  // <----



const upload = multer({ storage: multer.memoryStorage() })
const storage = getStorage()

import sportsdetailcollection from "../../Models/college/sportsModel.js"

const sportsdetailRouter = express.Router()


// api for add sports detail for clg registration process
sportsdetailRouter.post("/v2/reg/sportsdetail", authorization, /*  upload.array("image") */ upload.single("image"), async (req, res) => {
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

            // let f1 = req.files
            // console.log("f1 ======", f1);


            // const storage = getStorage();
            // const storageRef = ref(storage, '/a12');

            // // 'file' comes from the Blob or File API
            // uploadBytes(storageRef, f1[0]).then((snapshot) => {
            //     console.log('Uploaded a blob or file!');
            // });


            // const storageRef = ref(storage, f1.originalname)
            // const metadata = {
            //     contentType: 'image/jpeg'
            // };

            // async function uploadFile() {
            //     try {
            //       const snapshot = await uploadBytes(
            //         ref(storage, `${f1[1]["originalname"]}`),
            //         f1[1]
            //       );
            //     } catch (error) {
            //       console.log(error);
            //     }
            //   }
            //   uploadFile();

            const storageRef = ref(storage, req.file.originalname)
            const metadata = {
                contentType: 'image/jpeg' || 'image/png' || 'image/jpg'
            };


            //get image url and store in database 
            uploadBytes(storageRef, req.file.buffer, metadata).then(() => {
                getDownloadURL(storageRef).then(url => {

                    const sportsimage = new sportsdetailcollection({ collegeid , imageid ,  url , more_info  })
    
                    const sportsdata = sportsimage.save()
    
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
        return res.status(400).send(error)
    }
})

//api for remove sports image from database
sportsdetailRouter.post("/v2/sports/remove", async (req, res) => {

    const imageid = req.body.imageid

    const deleteimage = await sportsdetailcollection.deleteOne({ imageid })

    return res.status(201).send({ message: "successfully removed" })

})



export default sportsdetailRouter
