import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    accessToken: String
}, {versionKey: false});

const accessTokenProperty = mongoose.model('AccessToken', propertySchema);

async function getAccessToken(access_token) {
    try{
        return await accessTokenProperty.findOne({accessToken: access_token});
    } catch (error){
        console.error("Can't find Token:", error);
        throw error;
    }
}

export {accessTokenProperty, getAccessToken};
