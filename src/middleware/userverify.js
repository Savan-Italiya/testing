import signinclgadmin from "../../Models/signin/signinclgadminModel.js";

//this function is verify the user exit or not
async function uservertify(req, res, next) {

    // check user exist
    const userExist = await signinclgadmin.findOne({ email: req.body.email })
    if (userExist)
        return res.status(400).send({ error: "Email is already exist." })

    next()
}

export default uservertify;