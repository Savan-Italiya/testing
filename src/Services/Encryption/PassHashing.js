import bcrypt from "bcrypt";

//password hashing 

async function passHashed(password) {
    // console.log("password:", password);
    const encryptedPassword = await bcrypt.hash(password, 10);
    // console.log(encryptedPassword);
    return encryptedPassword;
}

export default passHashed;