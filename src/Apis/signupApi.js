import express from "express"

import clgsigup from "../Models/signin/clgsignup.js"

const signupRouter = new express.Router()


//api for signup the users router  
signupRouter.post("/v2/login/signupclg", async (req, res) => {
    try {
        const { email, password, role, collegeid } = req.body

        const userpreparedata = new clgsigup({ email, password, role, collegeid })

        const userData = await userpreparedata.save()

        return res.status(201).send({ Message: "sucessfully signup" })

    } catch (error) { 
        console.log(error);
        return res.status(401).send({ error: error })
    }
})

export default signupRouter
