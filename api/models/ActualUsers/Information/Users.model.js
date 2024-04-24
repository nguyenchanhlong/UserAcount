import mongoose from "mongoose";

// Define the schema
const userAccountSchema = new mongoose.Schema({
    username: {type: String, unique: true, index: true},
    password: String,
    nameaccount: String,
    phone: Number,
    address: String,
    email: String
}, {versionKey: false});

// Create the model
const UserAccount = mongoose.model('User_Account', userAccountSchema);


// Export functions
export {UserAccount};
