import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from 'next/headers'
import connectToDB from "../../../../DB/connection";
import { User } from "../../../../model/user";

export async function POST(req: NextRequest) {
    await connectToDB(process.env.MONGO_URI as string); 
    const cookieStore = await cookies()
    const reqBody = await req.json();
    const { name, email, password, role } = reqBody;

    if (!name || !email || !password || !role) {
        return NextResponse.json({
            msg: "Invalid response",
            status: false,
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const createdUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });
        
        return NextResponse.json({
            msg: "User created successfully",
            status: true,
            user: createdUser,
        });
    } catch (err) {
        console.error("Error creating user:", err);
        return NextResponse.json({
            msg: "Something went wrong",
            status: false,
        });
    }
}
