import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Decoded Token:", token);

    return NextResponse.json({ token });
}
