import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import connectToDB from "../../../../DB/connection";
import { User } from "../../../../model/user";
import authMiddleware from "../../helper/authMiddleware";

export async function POST(req: NextRequest) {
    await connectToDB(process.env.MONGO_URI as string);
    const cookieStore = cookies();

    const userAuth = await authMiddleware(req);
    console.log("userAuth:", userAuth);

    if (userAuth instanceof NextResponse) return userAuth;

    const reqBody = await req.json();
    const { email, password } = reqBody;

    if (!email || !password) {
        return NextResponse.json({
            msg: "Invalid response",
            status: false,
        });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log(existingUser);
            return NextResponse.json({ msg: "User not found", status: false });
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json({ msg: "Invalid password", status: false });
        }

        const payload = {
            id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        existingUser.token = token;
        await existingUser.save();

        (await cookieStore).set('token', token);

        return NextResponse.json({
            msg: "User logged in successfully",
            status: true,
            user: existingUser,
            token: token,
        });

    } catch (err) {
        console.error("Error creating user:", err);
        return NextResponse.json({
            msg: "Something went wrong",
            status: false,
        });
    }
}
