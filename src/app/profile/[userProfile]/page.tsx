'use client'

import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {
  const { userProfile } = useParams();
  return (
    <div>
      this is the profile page of {userProfile}
    </div>
  );
}

export default page;
