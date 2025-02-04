import { User } from "@/model/user";
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const allUsers = await User.find()

    return NextResponse.json({
        msg: "all users found",
        user: allUsers
    });
}