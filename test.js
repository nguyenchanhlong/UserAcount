// import mongoose from 'mongoose';
// import AccessTokenProperty from './models/AccessTokenProperty.js';
// import dotenv from "dotenv";
// import {
//     CreateNewUserAccount,
//     GetUserAccount,
//     UpdateUserAccount,
//     DeleteUserAccount,
//     GetUsernameUserPassword
// } from "./models/UserProperties.js";
//
// dotenv.config()
// const uri = `mongodb://${process.env.HOST}:27017/${process.env.DB}`;
// mongoose.connect(uri)
//     .then(() => {
//         console.log('Connected to MongoDB!');
//         const newProperty = new CreateNewUserAccount()({
//             username: "chanhlong22@gmail.com",
//             password: "longdeptrai",
//             nameaccount: "long2",
//             phone: 123453234,
//             address: "TpHCM",
//             email: "chanhlong171002@gmail.com"
//         })
//         return newProperty.save()
//     })
//     .then(properties => {
//         console.log('Done!!', properties)
//     }).catch(error => {
//     console.log('error', error)
// });
// //
// // const userAccountInf = mongoose.connect(uri)
// //     .then(async () => {
// //         console.log('Connected!!!!');
// //
// //         try {
// //             const getUser = await GetUsernameUserPassword("chanhlong2@gmail.com","cacsca");
// //
// //             if (getUser === null) {
// //                 console.log('User account does not exist!');
// //             } else {
// //                 console.log("User account got:", getUser);
// //             }
// //         } catch (error) {
// //             console.log("Error:", error);
// //         }
// //     })
// //     .catch(error => {
// //         console.error('Connection error:', error);
// //     });
//
// // // mongoose.connect(uri).then(async () => {
// // //     console.log('Connected to database!!!');
// // //
// // //     try {
// // //         // Call the UpdateUserAccount function to update the user's account
// // //         const updatedUser = await UpdateUserAccount("long2", { phone: 84376661543});
// // //         console.log('Updated user account:', updatedUser);
// // //     } catch (error) {
// // //         console.error('Error updating user account:', error);
// // //     }
// // // });
// //
// // // mongoose.connect(uri)
// // //     .then(async () => {
// // //         console.log('Connected!!!!');
// // //
// // //         try {
// // //             const deleteUser = await DeleteUserAccount("long2");
// // //             if (deleteUser === null) {
// // //                 console.log('User account does not exist!');
// // //             } else {
// // //                 console.log("User account deleted:", deleteUser);
// // //             }
// // //         } catch (error) {
// // //             console.log("Error:", error);
// // //         }
// // //     })
// // //     .catch(error => {
// // //         console.error('Connection error:', error);
// // //     });


let list = [1, 2, 3, 4, 5];

// Get the latest value (last element) in the array
let latestValue = list[list.length - 1];

console.log("Latest value:", latestValue);