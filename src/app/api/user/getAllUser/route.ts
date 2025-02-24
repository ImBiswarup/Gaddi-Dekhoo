import { User } from "@/model/user";
import { NextResponse } from "next/server"

export async function GET() {
    const allUsers = await User.find({})
    console.log(allUsers);
    return NextResponse.json({
        msg: "all users found",
        user: allUsers
    });
}