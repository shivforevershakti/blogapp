import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    date: {
        type: Date,
        default: Date.now()
    },

});

const UserModel = mongoose.models.User || mongoose.model('User' , Schema);


export default UserModel;