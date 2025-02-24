import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req: NextRequest) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; 
    if (!token) {
        console.error("Token is missing from cookies.");
        return NextResponse.json(
            { msg: "Unauthorized: No token found", status: false },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("Decoded Token:", decoded); 
        return decoded;
    } catch (error : any) {
        console.error("Token verification failed:", error.message);
        return NextResponse.json(
            { msg: "Invalid or expired token", status: false },
            { status: 403 }
        );
    }
};


export default authMiddleware;
