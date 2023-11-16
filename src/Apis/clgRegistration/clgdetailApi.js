import express from "express"
import uuid4 from "uuid4"
import clgdetailcollection from "../../Models/college/clgdetailModel.js"
import authorization from "../../middleware/auth.js"
import { error } from "console"

// configure the router
const clgdetailRouter = express.Router()


// api for clgdetail add process
clgdetailRouter.post("/v2/reg/clgdetail", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const collegeid = uuid4()

            // retrieve data for clgdetail process
            const { collegename, email, phone, address, location ,  college_type, system_type, academic_type, affiliated, class_rooms, total_seats, class_type, college_code, college_area, no_of_floors, timings, more_info } = req.body

            

            //verifying the incoming clgdetaildata
            if (collegename === null || collegename === undefined || collegename === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter collegename"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (email === null || email === undefined || email === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter email"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (phone === null || phone === undefined || phone === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter phone"
                })
                return
            }
            //verifying the incoming clgdetaildata
            if (location === null || location === undefined || location === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter location"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (address === null || address === undefined || address === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter address"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (college_type === null || college_type === undefined || college_type === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter college_type"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (system_type === null || system_type === undefined || system_type === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter system_type"
                })
                return
            }
            //verifying the incoming clgdetaildata
            if (academic_type === null || academic_type === undefined || academic_type === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter acedemic_type"
                })
                return
            }
            
            //verifying the incoming clgdetaildata
            if (affiliated === null || affiliated === undefined || affiliated === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter affiliated"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (class_rooms === null || class_rooms === undefined || class_rooms === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter class_rooms"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (total_seats === null || total_seats === undefined || total_seats === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter total_seats"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (class_type === null || class_type === undefined || class_type === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter class_type"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (college_code === null || college_code === undefined || college_code === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter college_code"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (college_area === null || college_area === undefined || college_area === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter college_area"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (no_of_floors === null || no_of_floors === undefined || no_of_floors === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter no_of_floors"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (timings === null || timings === undefined || timings === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter timings"
                })
                return
            }

            //verifying the incoming clgdetaildata
            if (more_info === null || more_info === undefined || more_info === "") {
                res.status(401).send({
                    status: "failed",
                    error: "enter more_info"
                })
                return
            }
            
            const clgdetaildata = new clgdetailcollection({ collegeid, collegename, email, phone, location , address, college_type, system_type, academic_type, affiliated, class_rooms, total_seats, class_type, college_code, college_area, no_of_floors, timings, more_info })

            const clgregdetail = await clgdetaildata.save()

            // set collgeid as a cookie 
            res.cookie("collegeid", collegeid, {
                maxAge: 110000 * 60 * 10,
                expires: new Date(Date.now() + 99999999),
                httpOnly: false
            });
            res.status(201).send({ message: "successfully add" , collegeid })

        } else {

            res.status(403).send("you don't have a access")
        }



    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
})

// api for edit clgdetail process
clgdetailRouter.patch("/v2/reg/clgdetail/update", authorization, async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const collegeid = req.body.collegeid
            const updateclgname = req.body.collegename
            const updateemail = req.body.email
            const updatephone = req.body.phone
            const updateadress = req.body.address
            const updateclgtype = req.body.college_type
            const updatesystemtype = req.body.system_type
            const updateacademictype = req.body.academic_type
            const updateaffiliated = req.body.affiliated
            const updateclsroom = req.body.class_rooms
            const updatetotalseats = req.body.total_seats
            const updateclstype = req.body.class_type
            const updateclgcode = req.body.college_code
            const updateclgarea = req.body.college_area
            const updatenooffloors = req.body.no_of_floors
            const updatetimings = req.body.timings
            const updatemoreinfo = req.body.more_info

            const clgdetailupdation = await clgdetailcollection.updateMany({ collegeid }, { $set: { collegename: updateclgname, email: updateemail, phone: updatephone, address: updateadress, college_type: updateclgtype, system_type: updatesystemtype, academic_type: updateacademictype, affiliated: updateaffiliated, class_rooms: updateclsroom, total_seats: updatetotalseats, class_type: updateclstype, college_code: updateclgcode, college_area: updateclgarea, no_of_floors: updatenooffloors, timings: updatetimings, more_info: updatemoreinfo, new: true  , updatedAt: new Date() } })

            res.status(200).send({
                status: "success",
                msg: "data updated"
            })
        }

    } catch (error) {
        console.log(error);
    }

})

export default clgdetailRouter