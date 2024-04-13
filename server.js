import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {authenToken} from "./access_token_jwt/authorization.js";
// import {dataUserForGet} from "./authServer.js";
import {
    UserAccount,
    GetUserAccount,
    UpdateUserAccount,
    DeleteUserAccount,
    GetUsernameUserPassword
} from "./models/UserProperties.js";
import {Buffer} from "buffer";

dotenv.config();

const app = express();
const PORT = process.env.PORT_SERVER;
const uri = `mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DB}`;

let dataUserForUpdate = [];
let dataUserForGet = [];
app.use(express.json());

app.post('/signup', async (req, res) => {
    const dataPost = req.body;

    try {
        // Create a new instance of the UserAccount model
        const newUser = new UserAccount(dataPost);
        // Save the new user to the database
        await newUser.save();
        res.status(200).json({message: 'User account created successfully', user: newUser});
    } catch (error) {
        // console.error("Error creating user account:", error);
        res.status(500).json({error: "Error creating user account", message: "User account existed!"});
    }
});


app.get('/userInf', authenToken, (req, res) => {
    // This is the Username and Password in login when the client create JWT
    const authorizationHeader = req.headers['authorization'];
    // [1] mean Payload
    const token = authorizationHeader.split(' ')[1];
    // This code make encoded to decode Payload
    const dataUserPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    dataUserForGet.push(dataUserPayload)

    mongoose.connect(uri).then(async () => {
        try {
            const getUser = await GetUserAccount(`${dataUserForGet[dataUserForGet.length - 1].username}`);

            if (getUser === null) {
                res.status(404).json({message: "User account does not exist!"});
            } else {
                dataUserForUpdate.push(getUser);
                // console.log("User account got:", getUser);
                res.status(200).json({message: "User account got:", data: getUser});
            }
        } catch (error) {
        }
    })
});

app.put('/userInf/update', authenToken, (req, res) => {
    const dataUpdate = req.body;
    mongoose.connect(uri).then(async () => {
        try {
            const updateUserAccount = await UpdateUserAccount(dataUserForUpdate[dataUserForUpdate.length - 1].nameaccount, dataUpdate.update);
            res.status(200).json({message: "Updated success!!", data: updateUserAccount});
        } catch (error) {
            res.json({error: "Error", massage: error.message});
        }
    })
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
