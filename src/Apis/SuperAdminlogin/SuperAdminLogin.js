import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import createJwt from "../../Services/jsonwebtoken/webtoken.js"
import superAdminData from "../../Models/signin/superAdminModel.js"
import authorization from "../../middleware/auth.js";


const superAdminLoginRouter = express.Router()

superAdminLoginRouter.post("/v2/login/superAdmin", async (req, res) => {

    try {

        const { email, password, role } = req.body

        // validate the receive data
        if (email === null || email === undefined || email === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct email"
            })
            return
        }

         // validate the receive data
        if (password === null || password === undefined || password === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct password"
            })
            return
        }

         // validate the receive data
        if (role === null || role === undefined || role === "") {
            res.status(401).send({
                status: "failed",
                error: "enter correct role"
            })
            return
        }

        // verify user exist
        const superAdminlogin = await superAdminData.findOne({ email: email })

        if (!superAdminlogin) {
            return res.status(400).send({ error: "email is incorrect" })
        }

        // verify password

        const isMatchPassword = await bcrypt.compare(password, superAdminlogin.password);
        if (!isMatchPassword) {
            return res.status(400).send({ error: "password is incorrect " })
        }


        // create jwt token
        const jwtSecretKey = process.env.SECRET_KEY;

        const accesstoken = jwt.sign({ email, role }, jwtSecretKey);

        // store cookie
        res.cookie("jwtToken", accesstoken, {
            maxAge: 110000 * 60 * 10,
            expires: new Date(Date.now() + 258157351517),
            httpOnly: false
        });

        return res.status(201).send({ message: "login sucessfully" })

        
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }

})

export default superAdminLoginRouter