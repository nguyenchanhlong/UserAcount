import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {authenToken} from "./access_token_jwt/authorization.js";
import {
    UserAccount,
    GetUserAccount,
    UpdateUserAccount,
    DeleteUserAccount,
    GetUsernameUserPassword
} from "./models/UserProperties.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT_LOCAL || 5000;
const uri = `mongodb://${process.env.HOST}:${process.env.PORT_DB}/${process.env.DB}`;

let dataUserForGet = [];
let dataUserForUpdate = [];

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
                    dataUserForGet.push(data);
                    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'});
                    console.log({data});
                    res.status(200).json({accessToken});
                }

            } catch (error) {
                // console.log('Error', error);
                res.json({error: "Error", message: error.message})
            }
        });
    }
});

app.get('/userInf', authenToken, (req, res) => {
    // console.log(dataUserForGet[0].username)
    mongoose.connect(uri).then(async () => {
        try {
            const getUser = await GetUserAccount(`${dataUserForGet[dataUserForGet.length -1].username}`);

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
