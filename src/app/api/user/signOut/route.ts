import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();

    const token = (await cookieStore).get("next-auth.session-token")
        || (await cookieStore).get("__Secure-next-auth.session-token");

    if (!token) {
        return NextResponse.json({ error: "Session token not found" }, { status: 401 });
    }

    console.log("Session Token:", token.value);

    (await cookies()).set(token.name, "", { maxAge: 0 });

    return NextResponse.json({ token: token.value });
}
