import express from "express";
import {authenToken} from "../../../controllers/ActualAuthentication/Authorization.controller.js";
import mongoose from "mongoose";
import {
    DeleteUserAccount,
    GetUserAccount,
    UpdateUserAccount
} from "../../../controllers/ActualUser/Users.controller.js";
import {host_db, port_db, db} from "../../../config/ReadConfig.js";




const uri = `mongodb://${host_db}:${port_db}/${db}`;


const dataUserForGet = []
const dataUserForUpdate = []

const userRouter = express.Router();

userRouter.get('/userInf', authenToken, (req, res) => {
    console.log(authenToken)
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
            throw error;
        }
    })
});

userRouter.put('/userInf/update', authenToken, (req, res) => {
    const dataUpdate = req.body;
    mongoose.connect(uri).then(async () => {
        try {
            const updateUserAccount = await UpdateUserAccount(dataUserForUpdate[dataUserForUpdate.length - 1].nameaccount, dataUpdate.update);
            res.status(200).json({message: "Updated success!!", data: updateUserAccount});
        } catch (error) {
            res.json({error: "Error", message: error.message});
            throw error;
        }
    })
});

userRouter.delete('/userInf/delete', authenToken, (req, res) => {
    const dataDeleteNameAccount = req.body.nameaccount;
    mongoose.connect(uri).then(async () => {
        try {
            await DeleteUserAccount(dataDeleteNameAccount);
            res.status(200).json({message: "Delete success!!!"});
        } catch (error) {
            res.json({error: error, message: error.message});
            throw error;
        }
    })
})

export {userRouter}