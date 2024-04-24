import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import {UserAccount} from "../../models/ActualUsers/Information/Users.model.js";
import {GetUsernameUserPassword} from "../../controllers/ActualUser/Users.controller.js"
import {accessTokenProperty, deleteAccessToken} from "../../models/AccessToken/AccessTokenProperty.js";
import {port_auth, host_db, port_db, db, access_token_secret} from "../../config/ReadConfig.js";


const app = express();
const PORT = port_auth || 5500;
const uri = `mongodb://${host_db}:${port_db}/${db}`;


app.use(express.json());
app.post('/signup', async (req, res) => {
    const dataPost = req.body;
    mongoose.connect(uri).then(async () => {
        try {
            // Create a new instance of the UserAccount model
            const newUser = new UserAccount(dataPost);
            // Save the new user to the database
            await newUser.save();
            res.status(200).json({message: 'User account created successfully', user: newUser});
        } catch (error) {
            // console.error("Error creating user account:", error);
            res.status(500).json({error: "Error creating user account", message: "User account existed!"});
            throw error;
        }
    })
});

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
                    const accessToken = jwt.sign(data, access_token_secret, {expiresIn: '1d'});

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