"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <button onClick={() => signOut()} className="bg-red-500 text-white p-2 rounded">
          Sign out
        </button>
      ) : (
        <button onClick={() => signIn()} className="bg-blue-500 text-white p-2 rounded">
          Sign in
        </button>
      )}
    </div>
  );
};

export default AuthButton;
