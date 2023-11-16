import jwt from "jsonwebtoken"


// function for creating the json web token
const createJwt = async (unique_id) => {
    // creating the json web token
    const jsnToken = await jwt.sign(unique_id, process.env.SECRET_KEY)
    return jsnToken
}

// function for verify the json web token
const verifyJwt = async (web_token) => {
    // verifying the json web token
    try {

        const verificationFlag = await jwt.verify(web_token, process.env.SECRET_KEY)
        return verificationFlag

    } catch (error) {
        return false
    }
}

export default createJwt