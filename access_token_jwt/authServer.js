import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {GetUsernameUserPassword} from "../models/UserProperties.js";
import {accessTokenProperty, getAccessToken} from "../models/AccessTokenProperty.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT_AUTH;
const uri = `mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DB}`;
// let getAccessToken1 = getAccessToken

app.use(express.json());

app.post('/refreshToken', (req, res) => {

})

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
                    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});

                    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
                    const accessTokenObject = new accessTokenProperty({ accessToken: refreshToken }); // Create an object with the access token
                    res.status(200).json({accessToken, refreshToken});
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
