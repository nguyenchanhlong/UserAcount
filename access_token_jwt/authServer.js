import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {GetUsernameUserPassword} from "../models/UserProperties.js";
import {accessTokenProperty, deleteAccessToken} from "../models/AccessTokenProperty.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT_AUTH;
const uri = `mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DB}`;

app.use(express.json());


app.post('/logout', async (req, res) => {
    const accessTokenReq = req.body.token;
    try {
        await mongoose.connect(uri);
        await deleteAccessToken(accessTokenReq);
        res.json({message: "Logout successful"});
    } catch (error) {
        res.status(500).json({error: "Error", message: error.message});
    }
});


app.post('/login', (req, res) => {
    //Authorization
    const data = req.body;
    // Check if data is empty or missing username/password
    if (!data || !data.username || !data.password) {
        return res.status(400).json({error: 'Invalid request. Username and password are required.'});
    } else {
        mongoose.connect(uri).then(async () => {
            try {
                const getUserInf = await GetUsernameUserPassword(data.username, data.password);
                if (!getUserInf) {
                    res.status(404).json({message: 'User account does not exist!!'})
                } else {
                    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

                    const accessTokenObject = new accessTokenProperty({accessToken: accessToken}); // Create an object with the access token
                    res.status(200).json({message: "Login success!!!", accessToken: accessToken});
                    return accessTokenObject.save();
                }

            } catch (error) {
                // console.log('Error', error);
                res.json({error: "Error", message: error.message})
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
