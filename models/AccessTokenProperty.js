import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    access_token: String
}, {versionKey: false});

const AccessTokenProperty = mongoose.model('Access_token', propertySchema);

export default AccessTokenProperty;
