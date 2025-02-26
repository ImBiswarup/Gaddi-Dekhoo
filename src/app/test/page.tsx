'use client'

import React, { useEffect } from 'react'
import AuthButton from '../components/Authbutton'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useAppContext } from '../context/AppContext'

const Page = () => {
  const { user } = useAppContext()


  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      {user ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center flex flex-col items-center gap-y-5">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Signed in as {user?.name}
          </p>

          {user?.image && (
            <Image
              height={50}
              width={50}
              src={user.image}
              alt={user?.name || 'Profile'}
              className="rounded-full mt-2"
            />
          )}

          <AuthButton />
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Please sign in
          </p>
          <AuthButton />
        </div>
      )}
    </div>
  )
}

export default Page
