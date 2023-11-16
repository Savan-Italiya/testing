import jwt from "jsonwebtoken"
import cookies from "cookie-parser"
import 'dotenv/config';


//authentication middleware
const authorization = (req, res, next) => {
  try {
    const token = req.cookies.jwtToken;

    if (!token) {
      return res.status(403).send("access denied");
    }

    //verify token
    const data = jwt.verify(token.toString(), process.env.SECRET_KEY);

    req.email = data.email
    req.role = data.role

    return next();


  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export default authorization