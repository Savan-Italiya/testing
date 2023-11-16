import express from "express"

import superAdminData from "../../Models/signin/superAdminModel.js"

const superAdminRouter = new express.Router()

superAdminRouter.post("/v2/login/superadminreg", async (req, res) => {
    try {
        const { email, password } = req.body

        const userpreparedata = new superAdminData({ email, password })

        const userData = await userpreparedata.save()

        return res.status(201).send({ Message: "sucessfully" })
    } catch (error) {
        console.log(error);
    }
})

export default superAdminRouter