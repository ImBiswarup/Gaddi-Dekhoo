import { cookies } from "next/headers";

export default async function SignOut() {
    const cookieStore = await cookies()

    const token = cookieStore.get('next-auth.session-token')
    console.log(token);
}