import jwt from "jsonwebtoken";
import {access_token_secret} from "../../config/ReadConfig.js";


function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.status(401).json("Unauthorized");
    jwt.verify(token, access_token_secret, (err, data) => {
        console.log(err, data);
        if (err) res.status(403).json({error: err});
        next();

    });
}

export {authenToken}