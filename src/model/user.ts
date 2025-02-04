import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: string;
    token: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);