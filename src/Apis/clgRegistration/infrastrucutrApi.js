import express from "express"
import infrastructure from "../../Models/college/InfrastructureModel.js"
import authorization from "../../middleware/auth.js"
import uuid4 from "uuid4"

// configure the router
const infrastrucutreRouter = express.Router()


// api for select infreastructure detail for  clg registration process
infrastrucutreRouter.post("/v2/reg/infrastr", authorization, async (req, res) => {
    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const infraid = uuid4()

            const { collegeid, smartclass, staffroom, auditorium, computerlab, hostel, bustransport, parking, cctv, library, elevator, powerbackup, canteen, medicalsupport, firesafety, emergencyexit, playground, moreinfo } = req.body

            const infrastr = new infrastructure({ collegeid, infraid, smartclass, staffroom, auditorium, computerlab, hostel, bustransport, parking, cctv, library, elevator, powerbackup, canteen, medicalsupport, firesafety, emergencyexit, playground, moreinfo })

            const infradata = await infrastr.save()

            res.status(201).send({ message: "succesfully add" })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
})

infrastrucutreRouter.patch("/v2/reg/infrastr/edit", async (req, res) => {

    try {

        if (req.role === "superadmin" || req.role === "clgadmin") {

            const infraid = req.body.infraid

            const updatesmartclass = req.body.smartclass
            const updatestaffroom = req.body.staffroom
            const updateauditorium = req.body.auditorium
            const updatecomputerlab = req.body.computerlab
            const updatehostel = req.body.hostel
            const updatebustransport = req.body.bustransport
            const updateparking = req.body.parking
            const updatecctv = req.body.cctv
            const updatelibrary = req.body.library
            const updateelevator = req.body.elevator
            const updatepowerbackup = req.body.powerbackup
            const updatecanteen = req.body.canteen
            const updatemedicalsupport = req.body.medicalsupport
            const updatefiresafety = req.body.firesafety
            const updateemergencyexit = req.body.emergencyexit
            const updateplayground = req.body.playground
            const updatemoreinfo = req.body.moreinfo

            const infraupdation = await infrastructure.updateMany({ infraid }, { $set: { smartclass: updatesmartclass, staffroom: updatestaffroom, auditorium: updateauditorium, computerlab: updatecomputerlab, hostel: updatehostel, bustransport: updatebustransport, parking: updateparking, cctv: updatecctv, library: updatelibrary, elevator: updateelevator, powerbackup: updatepowerbackup, canteen: updatecanteen, medicalsupport: updatemedicalsupport, firesafety: updatefiresafety, emergencyexit: updateemergencyexit, playground: updateplayground, moreinfo: updatemoreinfo  , updatedAt: new Date() } })


            res.status(201).send({ message: "successfully data updated" })

        } else {
            res.status(403).send("you don't have a access ")
        }

    } catch (error) {
        console.log(error);
        return res.status(304).send(error)
    }
})

export default infrastrucutreRouter