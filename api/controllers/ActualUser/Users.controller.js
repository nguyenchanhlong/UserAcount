// Function to get Password and Username
import {UserAccount} from "../../models/ActualUsers/Information/Users.model.js";

async function GetUsernameUserPassword(username, password) {
    try {
        // Using await to ensure the result is awaited
        const getUserAccount = await UserAccount.findOne({username: username, password: password});
        // If the user account does not exist, findOne will return null
        if (!getUserAccount) {
            return null;
        } else {
            // Return the found user account directly
            return getUserAccount;
        }
    } catch (error) {
        console.error("Error getting user account:", error);
        throw error; // Rethrow the error for handling at the caller level
    }
}

// Function to get user account by username
async function GetUserAccount(username) {
    try {
        return await UserAccount.findOne({username: username});
    } catch (error) {
        console.error("Error getting user account:", error);
        throw error;
    }
}


// Function to update user account
async function UpdateUserAccount(nameaccount, updates) {
    try {
        return await UserAccount.findOneAndUpdate({nameaccount: nameaccount}, updates, {new: true});
    } catch (error) {
        console.error("Error updating user account:", error);
        throw error;
    }
}

// Function to delete user account
async function DeleteUserAccount(nameaccount) {
    try {
        return await UserAccount.findOneAndDelete({nameaccount: nameaccount});
    } catch (error) {
        console.error("Error deleting user account:", error);
        throw error;
    }
}

export {GetUserAccount, UpdateUserAccount, DeleteUserAccount, GetUsernameUserPassword};