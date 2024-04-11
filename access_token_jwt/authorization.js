import jwt from "jsonwebtoken";

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.status(401).json("Unauthorized");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        if (err) res.status(403).json({error:"Forbidden"});
        next();

    });
}

export {authenToken}