import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    provider?: string;
    role?: string;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    provider: { type: String, required: true }, 
    role: { type: String, default: "user" },
}, { timestamps: true  });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
