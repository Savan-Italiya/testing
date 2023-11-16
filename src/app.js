import express from "express";
import dotenv from "dotenv";

import cors from 'cors'
import 'dotenv/config';
import jwt from "jsonwebtoken"


import clgAdminloginRouter from "./Apis/clglogins/clgAdminloginApi.js";
import clgModeratorloginRouter from "./Apis/clglogins/clgModeratorLogin.js";
import studentReg from "./Apis/studentReg/studentRegApi.js";
import studentLoginRouter from "./Apis/studentLogin/studentLoginApi.js";
import superAdminLoginRouter from "./Apis/SuperAdminlogin/SuperAdminLogin.js";
import superAdminRouter from "./Apis/SuperAdminlogin/SuperAdmin.js";
import clgviewerloginRouter from "./Apis/clglogins/clgviewerLogin.js";
import signupRouter from "./Apis/signupApi.js";
import clgdetailRouter from "./Apis/clgRegistration/clgdetailApi.js";
import infrastrucutreRouter from "./Apis/clgRegistration/infrastrucutrApi.js";
import highlightRouter from "./Apis/clgRegistration/highlightApi.js";
import clgpolicySocialMediaRouter from "./Apis/clgRegistration/clgpolicySocialMediaApi.js";
import subjectRouter from "./Apis/clgRegistration/subjectApi.js";
import feestruRouter from "./Apis/clgRegistration/feeStructureApi.js";
import alutoppersRouter from "./Apis/clgRegistration/aluminitopperApi.js";
import staffdetailRouter from "./Apis/clgRegistration/managStaffApi.js";
import acedemicdetailRouter from "./Apis/clgRegistration/acedemicdetailApi.js";
import sportsdetailRouter from "./Apis/clgRegistration/sportsdetail.js";
import culturaldetailRouter from "./Apis/clgRegistration/culturaldetailApi.js";
import clgimageRouter from "./Apis/clgRegistration/clgimageApi.js";
import teamdetailRouter from "./Apis/teamsdetail/teamdetailApi.js";
import studentlistRouter from "./Apis/getStudentlist/getstudentlistApi.js";
import feedbackRouter from "./Apis/feedback/feedbackformApi.js";
import stdappliform from "./Apis/stdapplicationform/accept-rejectApi.js";
import applyclgRouter from "./Apis/applyclg/applyclgApi.js";
import admissionlistRouter from "./Apis/getAdmissionlist/AdmissionlistApi.js";
import collegelistRouter from "./Apis/getCollegeList/collegelistApi.js";
import appliedclgRouter from "./Apis/getappliedcollege/appliedcollegeApi.js";
import cookieParser from 'cookie-parser';
import courselistRouter from "./Apis/getCousrelist/getcourselistApi.js";
import studentReglistRouter from "./Apis/getstudentregisterlist/getstudentRegListApi.js";
import empstatusRouter from "./Apis/EmpStatus/updateEmpStatusApi.js";

// configuration of .env file
dotenv.config();

// configuration server express
const app = express();

// configuration of accepting body parser for json

// const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
const origin = ['http://localhost:5173','http://localhost:4173']
app.use(express.json());
app.use(
    cors({
       origin: origin,
      credentials: true,
   })
);

// configuration of get cookie
// app.use(cookies());
app.use(cookieParser());

//api middleware for clg admin login
app.use(clgAdminloginRouter);

//api middleware for clg moderator login
app.use(clgModeratorloginRouter);

//api middleware for student registration
app.use(studentReg);

//api middleware for student login router
app.use(studentLoginRouter);

//api middleware for super admin router
app.use(superAdminRouter);

//api middleware for super admin login router
app.use(superAdminLoginRouter);

//api middleware for clg viewer login router
app.use(clgviewerloginRouter);

//api middlware for add signin detail for clg admin
app.use(signupRouter);

// api middleware for add clg detail for clg registration
app.use(clgdetailRouter);

// api middleware for add infrastructure detail for clg registration
app.use(infrastrucutreRouter);

// api middleware for add highlight detail for clg registration
app.use(highlightRouter);

// api middleware for add clgpolicy and socialmedia detail for clg registration
app.use(clgpolicySocialMediaRouter);

// api middleware for add subject detail router for clg registration
app.use(subjectRouter);

// api middleware for add fee structure detail for clg registration
app.use(feestruRouter);

//api middleware for add alu toppers detail for clg registration
app.use(alutoppersRouter);

//api middleware for add staff detail for clg registration
app.use(staffdetailRouter);

// api middleware for add acedemic detail for clg registration
app.use(acedemicdetailRouter);

//api middleware for add sports detail for clg registration
app.use(sportsdetailRouter);

//api middleware for add cultural detail for clg registration
app.use(culturaldetailRouter);

//api middleware for add clg image detail for clg registration
app.use(clgimageRouter);

//api middlewarew for add team detail router
app.use(teamdetailRouter);

//api middleware for  get student list
app.use(studentlistRouter);

// api middleware for add detail feedback form router
app.use(feedbackRouter);

//api middleware for accept/reject student application form router
app.use(stdappliform);

// api middleware for student apply for college router
app.use(applyclgRouter);

// api middleware for get admission list router for super admin
app.use(admissionlistRouter);

//api middleware for get student list router for super admin
app.use(collegelistRouter);

//api middleware for get student applied college list
app.use(appliedclgRouter);

//api middleware for get course list
app.use(courselistRouter);

//api middleware for get all registred student list 
app.use(studentReglistRouter)

//api middleware for view emp status
app.use(empstatusRouter)


//verify the logging token
app.get("/v2/auth/is_logged_in", async (req, res) => {
    try {
        const token = req.cookies.jwtToken;

        if (!token) {
            return res.json(false);
        }
        const data1 = await jwt.verify(token, process.env.SECRET_KEY)

        if (data1) {
            return res.json(true)
        }
        else {
            return res.json(false)
        }

    } catch (error) {
        return res.json(false);
    }
})


// sever port listener
app.listen(process.env.SERVER_PORT, "0.0.0.0", () => {
   console.log("server is start", process.env.SERVER_PORT);
});
