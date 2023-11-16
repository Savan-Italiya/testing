import express from "express"
import teammodel from "../../Models/Team/teamModel.js"
import uuid4 from "uuid4"
import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"
import authorization from "../../middleware/auth.js"

//config the route
const teamdetailRouter = express.Router()

// api for add team memeber base on role 
teamdetailRouter.post("/v2/reg/team", authorization, async (req, res) => {

    try {

        if (req.role === 'superadmin') {

            const teammemberid = uuid4()
            const { name, employeeId, role, userId, password } = req.body

            //verifying the incoming teamdetail
            if (name === null || name === undefined || name === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter correct name"
                })
                return
            }

            if (employeeId === null || employeeId === undefined || employeeId === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter correct employeeId"
                })
                return
            }

            if (role === null || role === undefined || role === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter correct role"
                })
                return
            }

            if (userId === null || userId === undefined || userId === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter correct userId"
                })
                return
            }

            const encrypt = (password) => {
                const passphrase = 'OIUYGIG*Sichdicbdf9375432^%$EWRdf54KJHGSDi8ercn';
                return CryptoJS.AES.encrypt(password, passphrase).toString();
            }

            const encryppass = encrypt(password)

            const teamdetail = new teammodel({ teammemberid, name, employeeId, role, userId, password, encryppass })

            const teamdetaildata = await teamdetail.save()

            return res.status(201).send({ message: "succes" })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(406).json({
            error: error
        })
    }

})

//api for fetch data from teams collection  database
teamdetailRouter.get("/v2/team/getdata", authorization, async (req, res) => {

    try {

        if (req.role === 'superadmin') {

            let teamdata = await teammodel.find({})

            res.status(201).send({ teamdata })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        return res.status(204).json({
            error: error
        })
    }
})

// api for edit team detail 
teamdetailRouter.patch("/v2/reg/team/edit", authorization, async (req, res) => {

    try {

        if (req.role === 'superadmin') {

            const teammemberid = req.body.teammemberid
            const updatename = req.body.name
            const updateemployeeId = req.body.employeeId
            const updaterole = req.body.role
            const updateuserId = req.body.userId

            const teamdetailupdation = await teammodel.updateMany({ teammemberid }, { $set: { name: updatename, employeeId: updateemployeeId, role: updaterole, userId: updateuserId  , updatedAt: new Date() } })

            console.log(teamdetailupdation);

            return res.status(200).send({
                status: "success",
                msg: "data updated"
            })

        } else {
            res.status(403).send("you don't have a access ")
        }


    } catch (error) {
        console.log(error);
    }
})

export default teamdetailRouter