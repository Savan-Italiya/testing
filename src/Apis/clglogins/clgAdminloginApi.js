import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import clgsigup from "../../Models/signin/clgsignup.js";

const clgAdminloginRouter = express.Router();


// api for college admin login router process
clgAdminloginRouter.post("/v2/login/clgAdmin", async (req, res) => {

    try {

        const { email, password, role } = req.body;

        // validate the receive data
        if (email === null || email === undefined || email === "") {
            res.status(401).send({
                status: "failed",
                error: "enter email"
            })
            return
        }

         // validate the receive data
        if (password === null || password === undefined || password === "") {
            res.status(401).send({
                status: "failed",
                error: "enter email"
            })
            return
        }

         // validate the receive data
        if (role === null || role === undefined || role === "") {
            res.status(401).send({
                status: "failed",
                error: "enter role"
            })
            return
        }

        // verify user exist
        const adminLogin = await clgsigup.findOne({ email: email });

        if (!adminLogin) {
            return res.status(400).send({ error: "email is incorrect" })
        }

        // verify password
        const isMatchPassword = await bcrypt.compare(password, adminLogin.password);
        if (!isMatchPassword) {
            return res.status(400).send({ error: "password is incorrect " })
        }


        //create a Jwttoken
        const jwtSecretKey = process.env.SECRET_KEY;

        const accesstoken = jwt.sign({ email, role }, jwtSecretKey);

        // store cookie
        res.cookie("jwtToken", accesstoken, {
            maxAge: 110000 * 60 * 10,
            expires: new Date(Date.now() + 99999999),
            httpOnly: false
        });


        return res.status(201).send({ message: "login sucessfully" })

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: error });
    }

});

export default clgAdminloginRouter