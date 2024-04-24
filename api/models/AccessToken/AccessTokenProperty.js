import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    accessToken: String
}, {versionKey: false});

const accessTokenProperty = mongoose.model('AccessToken', propertySchema);

async function deleteAccessToken(accessTokenReq) {
    try {
        return await accessTokenProperty.findOneAndDelete({accessToken: accessTokenReq});
    } catch (error) {
        console.error("Can't find Token:", error);
        throw error;
    }
}


export {accessTokenProperty, deleteAccessToken};
