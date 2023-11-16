import express from "express"
import studentregister from "../../Models/student/studentregisterModel.js"
import uuid4 from "uuid4"

const studentReg = new express.Router()


//api for add student detail in database
studentReg.post("/v2/reg/students", async (req, res) => {

    try {
        const studentid = uuid4()

        const { role, name, gender, school_name, password, confirm_password, mobile, email } = req.body

        // verifying the incoming student detail
        if (role === null || role === undefined || role === "") {
            res.status(401).send({
                status: "failed",
                error: "enter role"
            })
            return
        }

        // verifying the incoming student detail
        if (name === null || name === undefined || name === "") {
            res.status(401).send({
                status: "failed",
                error: "enter name"
            })
            return
        }

        // verifying the incoming student detail
        if (gender === null || gender === undefined || gender === "") {
            res.status(401).send({
                status: "failed",
                error: "enter gender"
            })
            return
        }

        // verifying the incoming student detail
        if (school_name === null || school_name === undefined || school_name === "") {
            res.status(401).send({
                status: "failed",
                error: "enter school_name"
            })
            return
        }

        // verifying the incoming student detail
        if (password === null || password === undefined || password === "") {
            res.status(401).send({
                status: "failed",
                error: "enter password"
            })
            return
        }

        // verifying the incoming student detail
        if (confirm_password === null || confirm_password === undefined || confirm_password === "") {
            res.status(401).send({
                status: "failed",
                error: "enter confirm_password"
            })
            return
        }

        // verifying the incoming student detail
        if (mobile === null || mobile === undefined || mobile === "") {
            res.status(401).send({
                status: "failed",
                error: "enter mobile"
            })
            return
        }

        // verifying the incoming student detail
        if (email === null || email === undefined || email === "") {
            res.status(401).send({
                status: "failed",
                error: "enter email"
            })
            return
        }

        // password validation
        if (!(password === confirm_password)) {
            return res.status(400).send({ error: "password are not match" })
        }

        const studentdata = new studentregister({ studentid, role, name, gender, school_name, password, confirm_password, mobile, email })


        const studentdetail = await studentdata.save()

        res.status(201).send({ message: "succesfully added" })

    } catch (error) {
        console.log(error);
        res.status(406).send({ error: error });
    }
})

// api for edit student enterd detail
studentReg.patch("/v2/reg/student/edit", async (req, res) => {

    try {

        const studentid = req.body.studentid
        const updatefullname = req.body.full_name
        const updatedateofbirth = req.body.dateofbirth
        const updateschool_studied = req.body.school_studied
        const updatecommunity = req.body.community
        const updatedistract = req.body.distract
        const updatesteam = req.body.steam
        const updatesecondlanguage = req.body.second_language
        const updateemail = req.body.email
        const updatereservation = req.body.reservation
        const updatefathername = req.body.father_name
        const updatemothername = req.body.mother_name
        const updategender = req.body.gender
        const updateplace = req.body.place
        const updatereligion = req.body.religion
        const updatemandal = req.body.mandal
        const updatecourse = req.body.course
        const updatemedium = req.body.medium
        const updatephone = req.body.phone

        const studentdataupdation = await studentregister.updateMany({ studentid }, { $set: { full_name: updatefullname, dateofbirth: updatedateofbirth, school_studied: updateschool_studied, community: updatecommunity, distract: updatedistract, steam: updatesteam, second_language: updatesecondlanguage, email: updateemail, reservation: updatereservation, father_name: updatefathername, mother_name: updatemothername, gender: updategender, place: updateplace, religion: updatereligion, mandal: updatemandal, course: updatecourse, medium: updatemedium, phone: updatephone, updatedAt: new Date() } })


        res.status(200).send({
            status: "success",
            msg: "data updated"
        })

    } catch (error) {
        console.log(error);
        res.status(304).send({ error: error });
    }

})

export default studentReg