import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const authMiddleware = async (req: NextRequest) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value; // Ensure token exists

    if (!token) {
        return NextResponse.json(
            { msg: "Unauthorized", status: false },
            { status: 401 }
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        console.log("Decoded Token:", decoded);
        return decoded; 
    } catch (error) {
        return NextResponse.json(
            { msg: "Invalid Token", status: false },
            { status: 403 }
        );
    }
};

export default authMiddleware;
