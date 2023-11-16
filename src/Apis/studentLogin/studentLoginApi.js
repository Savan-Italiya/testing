import express from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config.js'
import studentregister from "../../Models/student/studentregisterModel.js";


// configure the login router
const studentLoginRouter = express.Router()

// api for login process
studentLoginRouter.post("/v2/login/student", async (req, res) => {
    try {

        // retrieve data for login process
        const { mobile  ,password} = req.body;

        // validate the receive data
        if (mobile === null || mobile === undefined || mobile === "") {
            res.status(401).send({
                status: "failed",
                error: "enter mobile number"
            })
            return
        }

         // validate the receive data
         if (password === null || password === undefined || password === "") {
            res.status(401).send({
                status: "failed",
                error: "enter password"
            })
            return
        }

        // verify user exist
        const studentLogin = await studentregister.findOne({ phone :mobile });


        if (!studentLogin) {
            return res.status(400).send({ error: "mobile number is not registerd" })
        }

        // verify password
        const isMatchPassword = await bcrypt.compare(password, studentLogin.password);
        if (!isMatchPassword) {
            return res.status(400).send({ error: "password is incorrect " })
        }

        // create jwt token
        const jwtSecretKey = process.env.SECRET_KEY;

        const accesstoken = jwt.sign({ mobile}, jwtSecretKey);

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

export default studentLoginRouter